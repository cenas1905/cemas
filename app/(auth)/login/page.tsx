'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClientComponentClient } from '@/lib/supabase-client';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      router.refresh();
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#03060b] p-4 relative overflow-hidden">
      {/* WebGL Particles background */}
      <Particles
        particleCount={70}
        speed={0.02}
        particleColors={['#6366f1', '#a855f7']}
        className="opacity-40"
      />

      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10 relative"
      >
        <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight text-white">
              CVio'ya Giriş Yap
            </CardTitle>
            <CardDescription className="text-slate-400">
              Hesabınıza giriş yaparak CV'nizi oluşturmaya devam edin.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-400 bg-red-950/30 border border-red-900/50 rounded-lg">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="isim@örnek.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-950/50 border-slate-800 text-white placeholder-slate-500 focus-visible:ring-indigo-500 focus-visible:ring-offset-0 focus-visible:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-slate-200">Şifre</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-950/50 border-slate-800 text-white placeholder-slate-500 focus-visible:ring-indigo-500 focus-visible:ring-offset-0 focus-visible:border-indigo-500"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium shadow-lg shadow-indigo-500/20"
              >
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </Button>
              <div className="text-center text-sm text-slate-400">
                Hesabınız yok mu?{' '}
                <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium underline-offset-4 hover:underline">
                  Kayıt Olun
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

