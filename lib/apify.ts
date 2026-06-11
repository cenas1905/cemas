const APIFY_TOKEN = process.env.APIFY_TOKEN;

export async function importLinkedInProfile(linkedinUrl: string) {
  if (!APIFY_TOKEN) {
    throw new Error('APIFY_TOKEN environment variable is not defined.');
  }

  // 1. Send run request to Apify
  // We use get-leads~linkedin-scraper as recommended, falling back to automation-lab~linkedin-profile-scraper format.
  const runResponse = await fetch(
    `https://api.apify.com/v2/acts/get-leads~linkedin-scraper/runs`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${APIFY_TOKEN}`
      },
      body: JSON.stringify({
        urls: [linkedinUrl],
        startUrls: [{ url: linkedinUrl }]
      })
    }
  );
  
  if (!runResponse.ok) {
    const errorText = await runResponse.text();
    throw new Error(`Apify start run failed: ${errorText}`);
  }

  const run = await runResponse.json();
  const runId = run.data.id;
  
  // 2. Poll for the run completion (wait up to 60 seconds)
  let result = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 2000));
    const statusRes = await fetch(
      `https://api.apify.com/v2/acts/get-leads~linkedin-scraper/runs/${runId}`,
      {
        headers: { 'Authorization': `Bearer ${APIFY_TOKEN}` }
      }
    );
    
    if (!statusRes.ok) continue;
    
    const status = await statusRes.json();
    if (status.data.status === 'SUCCEEDED') {
      // 3. Retrieve results from default dataset
      const dataRes = await fetch(
        `https://api.apify.com/v2/datasets/${status.data.defaultDatasetId}/items`,
        {
          headers: { 'Authorization': `Bearer ${APIFY_TOKEN}` }
        }
      );
      
      if (dataRes.ok) {
        const data = await dataRes.json();
        result = data[0];
      }
      break;
    } else if (['FAILED', 'ABORTED', 'TIMED-OUT'].includes(status.data.status)) {
      throw new Error(`Apify scraping run ended with status: ${status.data.status}`);
    }
  }
  
  if (!result) {
    throw new Error('Apify profile scraping timed out or returned no results.');
  }
  
  // 4. Map LinkedIn data to standard CV schema
  return mapLinkedInToCV(result);
}

function mapLinkedInToCV(profile: any) {
  // Support fields from multiple typical scraping schemas
  const fullName = profile.fullName || 
                   (profile.firstName && profile.lastName ? `${profile.firstName} ${profile.lastName}` : '') || 
                   profile.name || 
                   'Yeni Kullanıcı';

  return {
    personal: {
      fullName,
      headline: profile.headline || profile.title || '',
      location: profile.location || profile.geoLocationName || '',
      email: profile.email || '',
      linkedin: profile.linkedinUrl || profile.url || '',
      summary: profile.about || profile.summary || '',
      photo: profile.profilePicture || profile.profilePicUrl || ''
    },
    experience: (profile.positions || profile.experience || [])?.map((pos: any) => ({
      title: pos.title || pos.role || '',
      company: pos.companyName || pos.company || '',
      startDate: pos.startDate || pos.start || '',
      endDate: pos.endDate || pos.end || '',
      current: pos.isCurrent || !pos.endDate || false,
      description: pos.description || '',
      location: pos.location || ''
    })) || [],
    education: (profile.educations || profile.education || [])?.map((edu: any) => {
      const startYear = edu.startDate?.year || edu.startYear || (edu.startDate ? new Date(edu.startDate).getFullYear() : undefined);
      const endYear = edu.endDate?.year || edu.endYear || (edu.endDate ? new Date(edu.endDate).getFullYear() : undefined);
      return {
        school: edu.schoolName || edu.school || '',
        degree: edu.degreeName || edu.degree || '',
        field: edu.fieldOfStudy || edu.field || '',
        startYear: startYear || '',
        endYear: endYear || ''
      };
    }) || [],
    skills: (profile.skills || [])?.map((s: any) => typeof s === 'string' ? s : (s.name || '')) || [],
    certifications: (profile.certifications || [])?.map((c: any) => ({
      name: c.name || '',
      issuer: c.authority || c.issuingOrganization || '',
      date: c.date || c.issueDate || ''
    })) || []
  };
}
