import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    // 1. Find all CVs with expired PDF dates
    const { data: expiredCVs } = await supabaseAdmin
      .from('cvs')
      .select('id, pdf_url, user_id')
      .lt('pdf_expires_at', new Date().toISOString())
      .not('pdf_url', 'is', null);
    
    if (expiredCVs && expiredCVs.length > 0) {
      for (const cv of expiredCVs) {
        // 2. Clear PDF url from database row (Storage cleanup would happen here if we used file storage)
        await supabaseAdmin
          .from('cvs')
          .update({ pdf_url: null })
          .eq('id', cv.id);
      }
    }
    
    return Response.json({ cleaned: expiredCVs?.length || 0 });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
