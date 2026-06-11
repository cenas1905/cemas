import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Get current user session
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // Fetch profile plan details
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, full_name')
    .eq('id', session.user.id)
    .single();

  const isPro = profile?.plan === 'pro' || profile?.plan === 'annual';

  return (
    <div className="min-h-screen bg-[#090d16] text-white">
      {/* Header bar */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="text-xl font-black bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
              CVio
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition">
                CV'lerim
              </Link>
              <Link href="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition">
                Analitikler
              </Link>
              <Link href="/settings" className="text-sm font-medium text-slate-300 hover:text-white transition">
                Hesap Ayarları
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {isPro ? (
              <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                <Award className="w-3.5 h-3.5 fill-amber-300" />
                PRO ÜYE
              </span>
            ) : (
              <Link href="/upgrade">
                <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/10 transition duration-300">
                  ⚡ PRO'YA YÜKSELT
                </Button>
              </Link>
            )}
            
            <form action="/api/auth/logout" method="POST">
              <Button type="submit" variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-900">
                Çıkış Yap
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main content body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
