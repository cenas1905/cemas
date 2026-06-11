import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { Button } from '@/components/ui/button';
import {
  Sparkles, LayoutDashboard, Settings, Zap, LogOut,
  Award, FileText, Brain
} from 'lucide-react';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, full_name')
    .eq('id', session.user.id)
    .single();

  const isPro = profile?.plan === 'pro' || profile?.plan === 'annual';
  const firstName = profile?.full_name?.split(' ')[0] || '';

  return (
    <div className="min-h-screen bg-[#03060b] text-white">

      {/* ── TOP NAVIGATION BAR ── */}
      <header className="border-b border-white/6 bg-[#03060b]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-6" style={{ height: '60px' }}>

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight">CVio</span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 flex-1 max-w-sm">
            {[
              { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
              { href: '/dashboard/coach', label: 'AI Koç', icon: <Brain className="w-4 h-4" /> },
              { href: '/settings', label: 'Ayarlar', icon: <Settings className="w-4 h-4" /> },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isPro ? (
              <span className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                <Award className="w-3.5 h-3.5 fill-amber-300" />
                PRO ÜYE
              </span>
            ) : (
              <Link href="/upgrade" className="hidden sm:block">
                <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold shadow-lg shadow-amber-500/15 gap-1.5 text-xs">
                  <Zap className="w-3.5 h-3.5" />
                  Pro'ya Yükselt
                </Button>
              </Link>
            )}

            {/* User avatar + logout */}
            <div className="flex items-center gap-2">
              {firstName && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-500/40 border border-white/10 flex items-center justify-center text-xs font-bold text-indigo-300">
                  {firstName[0].toUpperCase()}
                </div>
              )}
              <form action="/api/auth/logout" method="POST">
                <Button type="submit" variant="ghost" size="sm" className="text-slate-500 hover:text-white hover:bg-white/5 gap-1.5 text-xs">
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Çıkış</span>
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden border-t border-white/5 flex items-center gap-1 px-4 py-2">
          {[
            { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
            { href: '/dashboard/coach', label: 'AI Koç', icon: <Brain className="w-4 h-4" /> },
            { href: '/settings', label: 'Ayarlar', icon: <Settings className="w-4 h-4" /> },
            { href: '/upgrade', label: 'Pro', icon: <Zap className="w-4 h-4" /> },
          ].map(item => (
            <Link key={item.href} href={item.href} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
