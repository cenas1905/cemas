'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles, ShieldCheck, Lock, CreditCard, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

function MockCheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const userId = searchParams.get('userId');
  const planType = searchParams.get('planType') || 'pro';
  
  const [loading, setLoading] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const isAnnual = planType === 'annual';
  const price = isAnnual ? '₺1.990,00' : '₺199,00';
  const period = isAnnual ? '/yıl' : '/ay';

  // Format card number like 0000 0000 0000 0000
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.substring(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardNumber(formatted);
  };

  // Format expiry like MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.substring(0, 4);
    if (value.length > 2) {
      value = `${value.substring(0, 2)}/${value.substring(2)}`;
    }
    setExpiry(value);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.substring(0, 3);
    setCvc(value);
  };

  const MOCK_SECRET = 'cvio_mock_2024_secret'; // Must match server env MOCK_CHECKOUT_SECRET

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !cardName || !cardNumber || !expiry || !cvc) return;
    
    setLoading(true);
    // Simulate 2s payment processing delay for realism
    setTimeout(() => {
      router.push(`/api/stripe/mock-success?userId=${userId}&planType=${planType}&token=${MOCK_SECRET}`);
    }, 2000);
  };

  if (!userId) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-slate-400">Geçersiz ödeme bağlantısı.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#03060b] text-white flex flex-col font-sans">
      <header className="border-b border-white/5 bg-[#03060b] px-6 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight">CVio</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <Lock className="w-3.5 h-3.5" /> 256-bit Güvenli Ödeme
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Order Summary */}
          <div className="order-2 md:order-1 flex flex-col justify-center">
            <Link href="/upgrade" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8 w-fit">
              <ArrowLeft className="w-4 h-4" /> Geri Dön
            </Link>
            
            <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-2">Siparişi Tamamla</h1>
            <p className="text-slate-400 text-sm mb-8">CVio Pro ile sınırsız yapay zeka gücüne erişin.</p>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-lg">CVio Pro</h3>
                  <p className="text-slate-400 text-sm mt-0.5">{isAnnual ? 'Yıllık Plan (Tasarruf %20)' : 'Aylık Plan'}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-white">{price}</div>
                  <div className="text-slate-400 text-xs">{period}</div>
                </div>
              </div>

              <hr className="border-white/5" />

              <ul className="space-y-3">
                {[
                  'Sınırsız Yapay Zeka Özgeçmiş Üretimi',
                  'Sınırsız Kapak Yazısı (Motivation Letter)',
                  'Premium Özgeçmiş Şablonları',
                  'Gelişmiş İş Eşleştirme ve Analitik'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8 text-xs text-slate-500 text-justify">
              <p>Bu ekran bir <strong className="text-white">Mock (Test)</strong> ödeme ekranıdır. Gerçek bir kart numarası girmenize gerek yoktur. Test için herhangi bir değer girebilirsiniz.</p>
            </div>
          </div>

          {/* Payment Form */}
          <div className="order-1 md:order-2">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>
              
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-400" />
                Ödeme Bilgileri
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-300 text-xs font-semibold">Kart Üzerindeki İsim</Label>
                  <Input
                    id="name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                    placeholder="Ad Soyad"
                    className="w-full bg-black/40 border-white/10 text-white placeholder-slate-600 focus-visible:ring-indigo-500 h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card" className="text-slate-300 text-xs font-semibold">Kart Numarası</Label>
                  <Input
                    id="card"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    required
                    placeholder="0000 0000 0000 0000"
                    className="w-full bg-black/40 border-white/10 text-white placeholder-slate-600 focus-visible:ring-indigo-500 h-11 font-mono tracking-wider"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry" className="text-slate-300 text-xs font-semibold">Son Kullanma (AA/YY)</Label>
                    <Input
                      id="expiry"
                      value={expiry}
                      onChange={handleExpiryChange}
                      required
                      placeholder="MM/YY"
                      className="w-full bg-black/40 border-white/10 text-white placeholder-slate-600 focus-visible:ring-indigo-500 h-11 font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc" className="text-slate-300 text-xs font-semibold">CVC Kodu</Label>
                    <Input
                      id="cvc"
                      value={cvc}
                      onChange={handleCvcChange}
                      required
                      placeholder="123"
                      className="w-full bg-black/40 border-white/10 text-white placeholder-slate-600 focus-visible:ring-indigo-500 h-11 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 shadow-xl shadow-indigo-500/25"
                  >
                    {loading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> İşleniyor...</>
                    ) : (
                      <>{price} Öde ve Başla</>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default function MockCheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#03060b] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    }>
      <MockCheckoutContent />
    </Suspense>
  );
}
