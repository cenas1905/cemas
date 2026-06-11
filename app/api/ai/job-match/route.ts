import { createClient } from '@/lib/supabase-server';
import { analyzeJobMatch } from '@/lib/claude';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    
    // 1. Authenticate user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return Response.json({ error: 'Yetkilendirme başarısız' }, { status: 401 });
    }
    
    // 2. Validate Pro plan subscription
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single();
      
    const isPro = profile?.plan === 'pro' || profile?.plan === 'annual';
    if (!isPro) {
      return Response.json({ error: 'Bu özellik sadece PRO üyeler içindir.' }, { status: 403 });
    }
    
    const { cvData, jobDescription } = await req.json();
    
    if (!cvData || !jobDescription) {
      return Response.json({ error: 'Gerekli alanlar eksik' }, { status: 400 });
    }
    
    // 3. Analyze compatibility
    const analysis = await analyzeJobMatch(cvData, jobDescription);
    
    return Response.json({ analysis });
  } catch (err: any) {
    return Response.json({ error: err.message || 'Eşleşme analizi yapılamadı' }, { status: 500 });
  }
}
