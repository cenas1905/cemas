'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClientComponentClient } from '@/lib/supabase-client';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Otomatik Giriş Kontrolü (Zaten oturum varsa doğrudan yönlendir)
  React.useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        window.location.href = '/dashboard';
      }
    }
    checkSession();
  }, [supabase]);

  // 2. E-posta Hatırlama (localStorage'dan oku)
  React.useEffect(() => {
    const savedEmail = localStorage.getItem('remembered_email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  /* ── Email/password login ── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError('E-posta veya şifre hatalı. Lütfen tekrar deneyin.');
      setLoading(false);
    } else {
      // Başarılı girişte e-postayı hatırla
      localStorage.setItem('remembered_email', email);
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-[#05080f] text-white flex">
      {/* ── Left panel — branding ── */}
      <div className="hidden lg:flex w-1/2 flex-col relative overflow-hidden border-r border-white/5"
        style={{ background:'linear-gradient(160deg,#0a0e1c 0%,#05080f 100%)' }}>
        <div className="absolute inset-0 dot-pattern opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-glow"
          style={{ background:'radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 70%)' }} />

        <div className="relative z-10 flex flex-col h-full p-12">
          <Link href="/" className="flex items-center gap-2.5 mb-auto">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <span className="text-white font-black text-sm">C</span>
            </div>
            <span className="font-black text-xl">CV<span className="gradient-text">io</span></span>
          </Link>

          <div className="mb-auto space-y-6 max-w-md">
            <h2 className="text-5xl font-black leading-tight">
              Kariyer hedeflerinize<br />
              <span className="gradient-text">daha hızlı ulaşın</span>
            </h2>
            <div className="space-y-4">
              {[
                { icon:'⚡', text:'60 saniyede profesyonel CV oluşturun' },
                { icon:'🤖', text:'Claude AI ile hedeflerinize göre optimize edin' },
                { icon:'🔗', text:'Kalıcı link ile takip edin' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3 text-slate-400 text-sm">
                  <span className="text-lg">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            {/* Floating CV preview */}
            <div className="p-5 rounded-2xl border border-white/8 animate-float mt-8"
              style={{ background:'rgba(13,18,32,0.7)', backdropFilter:'blur(12px)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:'linear-gradient(135deg,rgba(99,102,241,0.3),rgba(139,92,246,0.3))' }}>
                  <span className="text-lg">🎯</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Teknoloji Şirketi — Senior Frontend</p>
                  <p className="text-[10px] text-emerald-400">✓ AI optimize edildi</p>
                </div>
              </div>
              <div className="space-y-1.5">
                {[90, 75, 60].map((w,i) => (
                  <div key={i} className="h-2 rounded-full" style={{ width:`${w}%`, background:'linear-gradient(90deg,rgba(99,102,241,0.4),rgba(139,92,246,0.2))' }} />
                ))}
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                <span className="text-indigo-400">👁 523 görüntülenme</span>
                <span>·</span>
                <span>cvio.app/cv/cem-tasarim</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600">© {new Date().getFullYear()} CVio</p>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }} className="w-full max-w-md space-y-8">

          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2.5 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <span className="text-white font-black text-sm">C</span>
            </div>
            <span className="font-black text-xl">CV<span className="gradient-text">io</span></span>
          </Link>

          <div>
            <h1 className="text-4xl font-black text-white mb-2">Tekrar hoş geldiniz</h1>
            <p className="text-slate-400">Hesabınıza giriş yaparak devam edin.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2.5 p-4 rounded-xl border text-sm"
                style={{ background:'rgba(239,68,68,0.06)', borderColor:'rgba(239,68,68,0.2)', color:'#fca5a5' }}>
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300">E-posta</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="isim@ornek.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/8 bg-white/4 text-white placeholder-slate-600 text-sm outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type={showPw ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-white/8 bg-white/4 text-white placeholder-slate-600 text-sm outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-60"
              style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow:'0 4px 20px rgba(99,102,241,0.25)' }}>
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Giriş Yap <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Hesabınız yok mu?{' '}
            <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Ücretsiz Kayıt Olun
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
