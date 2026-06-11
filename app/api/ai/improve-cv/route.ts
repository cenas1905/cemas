import { createClient } from '@/lib/supabase-server';
import { improveCV } from '@/lib/claude';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    
    // 1. Authenticate user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return Response.json({ error: 'Yetkilendirme başarısız' }, { status: 401 });
    }
    
    const { cvData, targetCompany } = await req.json();
    
    // 2. Call Claude API to optimize fields
    const improvedData = await improveCV(cvData, targetCompany);
    
    return Response.json({ data: improvedData });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
