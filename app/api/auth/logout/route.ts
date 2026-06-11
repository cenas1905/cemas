import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  
  // Sign out user session
  await supabase.auth.signOut();

  // Redirect to login page
  const requestUrl = new URL(request.url);
  return NextResponse.redirect(new URL('/login', request.url), {
    status: 303 // Redirect after POST
  });
}
