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
                { icon:'⚡', text:'Dakikalar içinde profesyonel CV hazırlama' },
                { icon:'🎯', text:'ATS geçiş garantili AI içerik optimizasyonu' },
                { icon:'🔗', text:'Paylaşılabilir dijital kariyer linki' },
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
            <p className="text-slate-400">Dakikalar içinde profesyonel CV'nizi hazırlayın.</p>
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
