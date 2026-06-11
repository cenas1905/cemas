'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClientComponentClient } from '@/lib/supabase-client';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, User, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const supabase = createClientComponentClient();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error: err } = await supabase.auth.signUp({
      email, password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      try {
        await fetch('/api/email/welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, fullName }),
        });
      } catch {}
      setMessage('Kayıt başarılı! E-postanızdaki doğrulama linkine tıklayın.');
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    });
    if (err) {
      setError('Google ile kayıt yapılamadı. Tekrar deneyin.');
      setGoogleLoading(false);
    }
  };

  const pwStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const pwColor = ['', '#ef4444', '#f59e0b', '#10b981'][pwStrength];
  const pwLabel = ['', 'Zayıf', 'Orta', 'Güçlü'][pwStrength];

  return (
    <div className="min-h-screen bg-[#05080f] text-white flex">
      {/* ── Left panel ── */}
      <div className="hidden lg:flex w-1/2 flex-col relative overflow-hidden border-r border-white/5"
        style={{ background:'linear-gradient(160deg,#0a0e1c 0%,#05080f 100%)' }}>
        <div className="absolute inset-0 dot-pattern opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-glow"
          style={{ background:'radial-gradient(circle,rgba(139,92,246,0.15) 0%,transparent 70%)' }} />

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
              Kariyer yolculuğunuz<br />
              <span className="gradient-text">bugün başlıyor</span>
            </h2>

            {/* Benefits */}
            <div className="space-y-3">
              {[
                { icon:'✅', text:'Ücretsiz — kredi kartı gerekmez' },
                { icon:'⚡', text:'60 saniyede LinkedIn\'den import' },
                { icon:'🎯', text:'ATS geçer AI optimizasyon' },
                { icon:'🔗', text:'Paylaşılabilir kariyer linki' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3 text-slate-300 text-sm">
                  <span className="text-lg">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { v:'2.400+', l:'Kullanıcı' },
                { v:'%94', l:'Mülakat başarısı' },
                { v:'60sn', l:'Oluşturma süresi' },
                { v:'4.9★', l:'Puan' },
              ].map(s => (
                <div key={s.l} className="p-3 rounded-xl border border-white/6" style={{ background:'rgba(255,255,255,0.02)' }}>
                  <div className="text-xl font-black gradient-text">{s.v}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-600">© {new Date().getFullYear()} CVio</p>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }} className="w-full max-w-md space-y-7 py-8">

          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2.5 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <span className="text-white font-black text-sm">C</span>
            </div>
            <span className="font-black text-xl">CV<span className="gradient-text">io</span></span>
          </Link>

          <div>
            <h1 className="text-4xl font-black text-white mb-2">Hesap Oluşturun</h1>
            <p className="text-slate-400">Dakikalar içinde profesyonel CV\'nizi hazırlayın.</p>
          </div>

          {/* Google button */}
          <button onClick={handleGoogle} disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-white/10 bg-white/4 hover:bg-white/7 text-white font-semibold text-sm transition-all hover:border-white/20 disabled:opacity-50">
            {googleLoading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {googleLoading ? 'Yönlendiriliyor...' : 'Google ile Kayıt Ol'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-slate-500">veya e-posta ile</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2.5 p-4 rounded-xl border text-sm"
                style={{ background:'rgba(239,68,68,0.06)', borderColor:'rgba(239,68,68,0.2)', color:'#fca5a5' }}>
                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
              </div>
            )}
            {message && (
              <div className="flex items-start gap-2.5 p-4 rounded-xl border text-sm"
                style={{ background:'rgba(16,185,129,0.06)', borderColor:'rgba(16,185,129,0.2)', color:'#6ee7b7' }}>
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" /> {message}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300">Ad Soyad</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)}
                  placeholder="Ahmet Yılmaz"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/8 bg-white/4 text-white placeholder-slate-600 text-sm outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all"
                />
              </div>
            </div>

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
                <input type={showPw ? 'text' : 'password'} required minLength={6} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="En az 6 karakter"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-white/8 bg-white/4 text-white placeholder-slate-600 text-sm outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Password strength */}
              {password && (
                <div className="space-y-1.5">
                  <div className="flex gap-1">
                    {[1,2,3].map(l => (
                      <div key={l} className="flex-1 h-1 rounded-full transition-all" style={{ background: pwStrength >= l ? pwColor : 'rgba(255,255,255,0.08)' }} />
                    ))}
                  </div>
                  <p className="text-[11px]" style={{ color: pwColor }}>{pwLabel} şifre</p>
                </div>
              )}
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-60"
              style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow:'0 4px 20px rgba(99,102,241,0.25)' }}>
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Ücretsiz Hesap Oluştur <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <p className="text-[11px] text-slate-600 text-center">
              Kaydolarak <a href="#" className="text-slate-500 underline">Gizlilik Politikası</a>'nı kabul etmiş olursunuz.
            </p>
          </form>

          <p className="text-center text-sm text-slate-500">
            Zaten hesabınız var mı?{' '}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Giriş Yapın
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
