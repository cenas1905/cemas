'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase-client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Check, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function UpgradeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();

  const isExpired = searchParams.get('expired') === 'true';
  const expiredSlug = searchParams.get('slug');

  const [user, setUser] = useState<any>(null);
  const [loadingPrice, setLoadingPrice] = useState<string | null>(null);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, [supabase]);

  const handleCheckout = async (priceType: 'monthly' | 'annual') => {
    if (!user) {
      // If not logged in, redirect to login
      router.push(`/login?redirectTo=/upgrade`);
      return;
    }

    setLoadingPrice(priceType);

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          priceId: priceType === 'monthly'
            ? process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID || 'price_pro_monthly'
            : process.env.NEXT_PUBLIC_STRIPE_PRO_ANNUAL_PRICE_ID || 'price_pro_annual',
          userId: user.id,
          returnUrl: window.location.href
        })
      });

      if (!response.ok) {
        throw new Error('Checkout oluşturulamadı.');
      }

      const result = await response.json();
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      alert('Ödeme sayfasına yönlendirilirken hata oluştu.');
    } finally {
      setLoadingPrice(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Go back helper if user is logged in */}
        {user && (
          <div>
            <Link href="/dashboard" className="inline-flex items-center text-xs text-slate-400 hover:text-white transition font-medium gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Panele Geri Dön
            </Link>
          </div>
        )}

        {/* Link Expired Alert */}
        {isExpired && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-300">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Özgeçmiş Bağlantısının Süresi Doldu!</p>
              <p className="text-xs text-slate-400 mt-1">
                Görüntülemeye çalıştığınız <strong>/cv/{expiredSlug}</strong> bağlantısı ücretsiz plan limitleri (7 gün) nedeniyle pasif hale gelmiştir. Bağlantıyı kalıcı hale getirmek ve yeniden aktifleştirmek için lütfen Pro planına yükseltin.
              </p>
            </div>
          </div>
        )}

        <div className="text-center space-y-3">
          <h2 className="text-4xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400 fill-amber-400" />
            CVio Pro'ya Geçin
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Özgeçmişinizi mülakat uzmanlarına kalıcı olarak ulaştırın, yapay zeka kariyer koçu ile iş tekliflerini yakalayın.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto pt-4">
          {/* Plan Pro Monthly */}
          <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between relative">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Aylık Pro Plan</CardTitle>
              <CardDescription className="text-slate-400">Aylık faturalandırılan kariyer desteği.</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-black text-white">$9.99</span>
                <span className="text-slate-400 text-xs font-semibold"> / ay</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-350">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Kalıcı paylaşım linki (asla silinmez)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Şirkete özel bağlantılar (/cv/ali-google)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Sınırsız PDF indirme</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Tüm tasarım şablonları</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>AI Kariyer Koçu sohbeti</span>
              </div>
            </CardContent>
            <CardFooter className="pt-6 pb-6">
              <Button
                onClick={() => handleCheckout('monthly')}
                disabled={loadingPrice !== null}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
              >
                {loadingPrice === 'monthly' ? 'Yönlendiriliyor...' : 'Aylık Abone Ol'}
              </Button>
            </CardFooter>
          </Card>

          {/* Plan Pro Annual */}
          <Card className="border-amber-500/30 bg-slate-900/80 backdrop-blur-md flex flex-col justify-between relative ring-2 ring-amber-500/20">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-2 border-[#090d16]">
              EN POPÜLER (%35 TASARRUF)
            </div>
            
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Yıllık Pro Plan</CardTitle>
              <CardDescription className="text-slate-400">Yıllık ödeme ile kesintisiz destek.</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-black text-white">$79</span>
                <span className="text-slate-400 text-xs font-semibold"> / yıl</span>
                <span className="block text-[10px] text-amber-400 font-bold mt-1">($6.58 / aya denk gelir)</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-350">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Kalıcı paylaşım linki (asla silinmez)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Şirkete özel bağlantılar (/cv/ali-google)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Sınırsız PDF indirme</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Tüm tasarım şablonları</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>AI Kariyer Koçu sohbeti</span>
              </div>
            </CardContent>
            <CardFooter className="pt-6 pb-6">
              <Button
                onClick={() => handleCheckout('annual')}
                disabled={loadingPrice !== null}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
              >
                {loadingPrice === 'annual' ? 'Yönlendiriliyor...' : 'Yıllık Abone Ol'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function UpgradePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-slate-400">
        Yükleniyor...
      </div>
    }>
      <UpgradeContent />
    </Suspense>
  );
}
