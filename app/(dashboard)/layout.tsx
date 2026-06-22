import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import {
  LayoutDashboard, Settings, LogOut,
  FileText, Briefcase, Brain, Plus, Zap
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
  const fullName = profile?.full_name || '';
  const initials = fullName
    ? fullName.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
    : session.user.email?.[0]?.toUpperCase() || 'U';

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-[18px] h-[18px]" /> },
    { href: '/dashboard/cv/new', label: 'Yeni CV', icon: <Plus className="w-[18px] h-[18px]" /> },
    { href: '/cover-letters', label: 'Motivasyon Mektuplarım', icon: <FileText className="w-[18px] h-[18px]" /> },
    { href: '/dashboard/discover', label: "İş Eşleştirme", icon: <Brain className="w-[18px] h-[18px]" /> },
    { href: '/jobs', label: 'İş Arama', icon: <Briefcase className="w-[18px] h-[18px]" /> },
    { href: '/settings', label: 'Ayarlar', icon: <Settings className="w-[18px] h-[18px]" /> },
  ];

  return (
    <div className="relative min-h-screen text-white flex bg-[#05080f] overflow-x-hidden">
      
      {/* ─── PREMIUM DASHBOARD BACKGROUND DECORATIONS ─── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Dot pattern */}
        <div className="absolute inset-0 dot-pattern opacity-80" />
        
        {/* Glowing Blob 1 - Indigo */}
        <div 
          className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.15] animate-float-slow-1"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
        />

        {/* Glowing Blob 2 - Violet/Pink */}
        <div 
          className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.12] animate-float-slow-2"
          style={{ background: 'radial-gradient(circle, #8b5cf6 0%, #ec4899 100%)' }}
        />

        {/* Linear SaaS Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      
      {/* ── SIDEBAR ── */}
      <aside className="hidden md:flex flex-col w-56 border-r border-white/[0.04] fixed top-0 left-0 h-screen z-40 bg-[#05080f]/45 backdrop-blur-2xl">
        
        {/* Logo */}
        <div className="h-14 flex items-center px-5 border-b border-white/[0.04]">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
              <FileText className="w-4 h-4 text-black" />
            </div>
            <span className="text-[15px] font-bold text-white tracking-tight">CVio</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium text-[#888] hover:text-white hover:bg-white/5 transition-colors"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom: Upgrade + User */}
        <div className="px-3 pb-4 space-y-2">
          {!isPro && (
            <Link href="/upgrade" className="flex items-center gap-2.5 px-3 py-2 rounded-md border border-white/10 bg-white/5 hover:bg-white/8 transition-colors group">
              <Zap className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-[12px] font-semibold text-white">Pro'ya Geç</div>
                <div className="text-[10px] text-[#666]">Sınırsız AI & özellik</div>
              </div>
            </Link>
          )}
          {isPro && (
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-md border border-amber-500/20 bg-amber-500/5">
              <Zap className="w-4 h-4 text-amber-400" />
              <div className="text-[12px] font-semibold text-amber-300">Pro Üye</div>
            </div>
          )}
          
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-bold text-white">
                {initials}
              </div>
              <div className="text-[12px] text-[#aaa] truncate max-w-[80px]">
                {fullName || session.user.email?.split('@')[0]}
              </div>
            </div>
            <form action="/api/auth/logout" method="POST">
              <button type="submit" className="text-[#555] hover:text-white transition-colors p-1">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* ── MOBILE TOP BAR ── */}
      <header className="md:hidden border-b border-white/[0.04] bg-[#05080f]/45 backdrop-blur-2xl sticky top-0 z-50 flex items-center justify-between px-4 h-14 w-full">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
            <FileText className="w-4 h-4 text-black" />
          </div>
          <span className="text-[15px] font-bold text-white">CVio</span>
        </Link>
        {!isPro && (
          <Link href="/upgrade" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/10 bg-white/5 text-[11px] font-semibold text-amber-300">
            <Zap className="w-3 h-3" /> Pro'ya Geç
          </Link>
        )}
      </header>

      {/* ── MOBILE BOTTOM NAV ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#05080f]/75 backdrop-blur-2xl border-t border-white/[0.04] z-50 flex">
        {navItems.slice(0, 4).map(item => (
          <Link key={item.href} href={item.href} className="flex-1 flex flex-col items-center justify-center py-2 text-[#666] hover:text-white transition-colors">
            {item.icon}
            <span className="text-[9px] mt-1 font-medium">{item.label.split(' ')[0]}</span>
          </Link>
        ))}
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="relative z-10 flex-1 md:ml-56 w-full min-h-screen pb-20 md:pb-0">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
