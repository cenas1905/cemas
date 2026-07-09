import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'global')
      .single();
      
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is not found
    
    // Return empty object if not found, frontend can use fallbacks
    return NextResponse.json(data || {});
  } catch (error: any) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // Upsert the global settings
    const { data, error } = await supabase
      .from('site_settings')
      .upsert({
        id: 'global',
        ...body,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
      
    if (error) throw error;
    
    return NextResponse.json({ success: true, settings: data });
  } catch (error: any) {
    console.error('Error updating site settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
