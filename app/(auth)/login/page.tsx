'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClientComponentClient } from '@/lib/supabase-client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, ArrowRight, Mail, Lock, AlertCircle } from 'lucide-react';
import Particles from '@/components/animations/Particles';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError('E-posta veya şifre hatalı. Lütfen tekrar deneyin.');
      setLoading(false);
    } else {
      router.refresh();
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#03060b] flex relative overflow-hidden">
      <Particles particleCount={60} speed={0.02} particleColors={['#6366f1','#a855f7']} className="opacity-25" />

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Left branding panel — hidden on small screens */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative z-10 border-r border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">CVio</span>
        </Link>

        <div className="space-y-6">
          <h2 className="text-4xl font-black text-white leading-tight">
            Kariyerinizi<br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">yeniden şekillendirin.</span>
          </h2>
          <div className="space-y-4">
            {[
              '60 saniyede LinkedIn\'den CV oluşturun',
              'Şirkete özel AI optimizasyonu',
              'Kalıcı paylaşılabilir CV linkleri',
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-400">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
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
            <h1 className="text-3xl font-black text-white mb-2">Tekrar Hoş Geldiniz</h1>
            <p className="text-slate-400 text-sm">Hesabınıza giriş yapın ve CV'nizi yönetin.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/8 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

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
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-10 bg-white/4 border-white/10 text-white placeholder-slate-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500/50 h-11"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold h-11 shadow-xl shadow-indigo-500/20 transition-all hover:scale-[1.02]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Giriş Yapılıyor...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Giriş Yap
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
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
