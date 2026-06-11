import { createClient } from '@/lib/supabase-server';
import { importLinkedInProfile } from '@/lib/apify';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    
    // 1. Authenticate user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return Response.json({ error: 'Yetkilendirme başarısız' }, { status: 401 });
    }
    
    const { linkedinUrl } = await req.json();
    if (!linkedinUrl) {
      return Response.json({ error: 'linkedinUrl parametresi eksik' }, { status: 400 });
    }
    
    // 2. Scraping using Apify actor
    const data = await importLinkedInProfile(linkedinUrl);
    
    return Response.json({ data });
  } catch (err: any) {
    return Response.json({ error: err.message || 'LinkedIn profili içe aktarılamadı' }, { status: 500 });
  }
}
