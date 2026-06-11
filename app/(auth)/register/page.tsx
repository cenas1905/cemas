'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClientComponentClient } from '@/lib/supabase-client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, ArrowRight, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import Particles from '@/components/animations/Particles';

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else {
      try {
        await fetch('/api/email/welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, fullName }),
        });
      } catch {}
      setMessage('Kayıt başarılı! E-posta adresinize gönderilen doğrulama linkine tıklayın.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#03060b] flex relative overflow-hidden">
      <Particles particleCount={60} speed={0.02} particleColors={['#6366f1','#a855f7']} className="opacity-25" />

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative z-10 border-r border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">CVio</span>
        </Link>

        <div className="space-y-6">
          <h2 className="text-4xl font-black text-white leading-tight">
            Kariyer yolculuğunuz<br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">bugün başlıyor.</span>
          </h2>
          <div className="space-y-4">
            {[
              'Ücretsiz hesap, kredi kartı gerekmez',
              'LinkedIn\'den 60 saniyede CV oluştur',
              'AI ile şirkete özel optimize et',
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-400">
                <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-600">© {new Date().getFullYear()} CVio. Tüm Hakları Saklıdır.</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">CVio</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-white mb-2">Hesap Oluşturun</h1>
            <p className="text-slate-400 text-sm">Dakikalar içinde yapay zeka destekli CV'nizi hazırlayın.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/8 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}
            {message && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-500/8 border border-emerald-500/20 text-emerald-300 text-sm">
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                {message}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-sm font-medium text-slate-300">Ad Soyad</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Ahmet Yılmaz"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="pl-10 bg-white/4 border-white/10 text-white placeholder-slate-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500/50 h-11"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-slate-300">E-posta</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="isim@ornek.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10 bg-white/4 border-white/10 text-white placeholder-slate-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500/50 h-11"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium text-slate-300">Şifre</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="En az 6 karakter"
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-10 bg-white/4 border-white/10 text-white placeholder-slate-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500/50 h-11"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold h-11 shadow-xl shadow-indigo-500/20 transition-all hover:scale-[1.02] mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Hesap Oluşturuluyor...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Ücretsiz Hesap Oluştur
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>

            <p className="text-[11px] text-slate-600 text-center mt-1">
              Kayıt olarak{' '}
              <Link href="/" className="text-slate-500 hover:text-slate-400 underline">
                Gizlilik Politikamızı
              </Link>{' '}
              kabul etmiş olursunuz.
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
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
