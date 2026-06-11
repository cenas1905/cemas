import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || ''
});

// CV'yi AI ile iyileştir
export async function improveCV(cvData: any, targetCompany?: string) {
  const prompt = targetCompany
    ? `Bu CV'yi ${targetCompany} şirketine başvuru için optimize et. ATS sistemlerini geç, şirketin değerleriyle uyumlu hale getir.`
    : `Bu CV'yi genel iş başvuruları için optimize et. Güçlü fiiller kullan, başarıları ölçülebilir hale getir.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022', // Standard Claude 3.5 Sonnet model name
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: `${prompt}\n\nCV Verisi:\n${JSON.stringify(cvData, null, 2)}\n\nSadece JSON formatında iyileştirilmiş CV'yi döndür. JSON nesnesi şu alanları içermelidir: personal (fullName, headline, location, email, linkedin, summary, photo), experience (title, company, startDate, endDate, current, description, location dizisi), education (school, degree, field, startYear, endYear dizisi), skills (string dizisi), certifications (name, issuer, date dizisi). Cevabında hiçbir açıklama, markdown fesi (fenced block) ya da giriş cümlesi olmasın, sadece saf JSON verisi döndür.`
      }
    ]
  });

  const content = response.content[0].type === 'text' ? response.content[0].text : '{}';
  
  // Clean up any potential markdown formatting
  let jsonString = content.trim();
  if (jsonString.startsWith('```json')) {
    jsonString = jsonString.slice(7);
  }
  if (jsonString.startsWith('```')) {
    jsonString = jsonString.slice(3);
  }
  if (jsonString.endsWith('```')) {
    jsonString = jsonString.slice(0, -3);
  }
  jsonString = jsonString.trim();

  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('Failed to parse AI improved CV JSON:', e, 'Raw content:', content);
    return cvData; // Fallback to original CV data
  }
}

// Kariyer koçu sohbeti
export async function careerCoach(message: string, cvData: any) {
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1000,
    system: `Sen deneyimli bir kariyer koçusun. Kullanıcının CV'si şu: ${JSON.stringify(cvData)}. Onlara iş arama, müzakere ve kariyerleri hakkında Türkçe olarak kişiselleştirilmiş, samimi ve profesyonel tavsiyeler ver.`,
    messages: [
      { role: 'user', content: message }
    ]
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// AI ile Kapak Yazısı (Cover Letter) üret
export async function generateCoverLetter(cvData: any, companyName: string, jobTitle: string, jobDescription?: string) {
  const jobDescSection = jobDescription ? `İş Tanımı:\n${jobDescription}\n` : '';
  const prompt = `Lütfen aşağıdaki CV verilerine göre, ${companyName} şirketindeki "${jobTitle}" pozisyonuna başvuru için profesyonel, etkileyici ve kişiselleştirilmiş bir Kapak Yazısı (Cover Letter) taslağı oluştur.
  
CV Verisi:
${JSON.stringify(cvData, null, 2)}

${jobDescSection}
Yazı; samimi, profesyonel, ikna edici ve adayın güçlü yanlarını vurgulayan bir yapıda olmalıdır. Lütfen doğrudan mektup içeriğini Türkçe olarak döndür (giriş, hitap, gövde paragrafları ve saygılarımla kısmı dahil).`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2000,
    messages: [
      { role: 'user', content: prompt }
    ]
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// AI ile İş İlanı Eşleşme Analizi yap
export async function analyzeJobMatch(cvData: any, jobDescription: string) {
  const prompt = `Aşağıdaki CV ile verilen iş tanımını (Job Description) detaylıca karşılaştır. Eşleşme yüzdesini (%) hesapla ve güçlü yanları, CV'de eksik olan beceri veya tecrübeleri (gaps) ve CV'yi bu ilana göre optimize etmek için yapılması gereken net düzeltmeleri belirle.
  
CV Verisi:
${JSON.stringify(cvData, null, 2)}

İş Tanımı:
${jobDescription}

Lütfen analizi sadece ve sadece geçerli bir JSON nesnesi formatında döndür. JSON nesnesi şu alanları tam olarak içermelidir:
{
  "score": 75, // 0 ile 100 arasında bir tam sayı (tahmini eşleşme skoru)
  "strengths": ["...", "..."], // Adayın bu ilanla eşleşen en güçlü 3-4 yanı
  "gaps": ["...", "..."], // İlanda istenen ama CV'de eksik olan 3-4 yetenek/deneyim
  "suggestions": ["...", "..."] // CV'yi bu ilana özel uyarlamak için 3-4 somut iyileştirme önerisi
}

Cevabında hiçbir açıklama, markdown fesi (fenced block) ya da giriş cümlesi olmasın, sadece saf JSON verisi döndür.`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2000,
    messages: [
      { role: 'user', content: prompt }
    ]
  });

  const content = response.content[0].type === 'text' ? response.content[0].text : '{}';
  
  let jsonString = content.trim();
  if (jsonString.startsWith('```json')) {
    jsonString = jsonString.slice(7);
  }
  if (jsonString.startsWith('```')) {
    jsonString = jsonString.slice(3);
  }
  if (jsonString.endsWith('```')) {
    jsonString = jsonString.slice(0, -3);
  }
  jsonString = jsonString.trim();

  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('Failed to parse Job Match JSON:', e, 'Raw content:', content);
    return {
      score: 50,
      strengths: ['Analiz tamamlanamadı'],
      gaps: ['Servis geçici olarak yanıt vermedi'],
      suggestions: ['Lütfen ilanı sadeleştirip tekrar deneyin']
    };
  }
}

