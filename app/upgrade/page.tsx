'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase-client';
import { Check, ArrowLeft, Loader2, Shield, Zap, AlertTriangle } from 'lucide-react';

const proFeatures = [
  'Kalıcı paylaşım bağlantısı',
  'Sınırsız AI içerik üretimi',
  'LinkedIn profilini içe aktar',
  'Tüm premium şablonlar',
  'Sınırsız PDF indirme',
  'Kapak mektubu oluşturucu',
  'İş eşleştirme analitiği',
  'Gerçek zamanlı görüntülenme istatistikleri',
  'Şirkete özel paylaşım URL\'si',
  'Öncelikli destek',
];

function UpgradeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isExpired = searchParams.get('expired') === 'true';
  const slug = searchParams.get('slug');
  const supabase = createClientComponentClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUserId(session.user.id);
        }
      }
    };
    fetchUser();
  }, [supabase]);

  const handleUpgrade = async (planType: 'monthly' | 'annual') => {
    let currentUserId = userId;
    
    // On-demand session check as fallback if state userId is null
    if (!currentUserId) {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        currentUserId = session.user.id;
        setUserId(currentUserId);
      }
    }

    if (!currentUserId) {
      router.push('/register');
      return;
    }

    setLoading(planType);
    try {
      const res = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planType, userId: currentUserId, returnUrl: window.location.origin + '/upgrade' })
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      alert('Ödeme başlatılamadı, lütfen tekrar deneyin.');
    } finally {
      setLoading(null);
    }
  };

  const monthlyPrice = 199;
  const annualTotal = 1490;
  const annualMonthly = Math.round(annualTotal / 12);
  const savings = Math.round((1 - annualTotal / (monthlyPrice * 12)) * 100);
  const currentPrice = billing === 'annual' ? annualMonthly : monthlyPrice;

  return (
    <div className="min-h-screen bg-[#060608] text-white">
      <div className="max-w-[900px] mx-auto px-5 py-12 sm:py-16">
        
        {/* Expired warning banner */}
        {isExpired && (
          <div className="mb-8 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-300 text-sm flex items-start gap-3 leading-relaxed animate-fade-up">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <div className="font-bold text-white mb-1">Paylaşım Bağlantınızın Süresi Doldu!</div>
              <div>
                {slug ? (
                  <><strong>/cv/{slug}</strong> adresindeki paylaşım bağlantınız ücretsiz plan sınırını (7 gün) aşmıştır. </>
                ) : (
                  <>Paylaşım bağlantınızın süresi dolmuştur. </>
                )}
                Bağlantıyı tekrar aktif hale getirmek, kalıcı kılmak ve şirketlere özel URL'ler almak için lütfen Pro plana geçin.
              </div>
            </div>
          </div>
        )}
        
        {/* Back */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[13px] text-[#666] hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>

        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-[12px] font-medium text-[#888]">
            <Zap className="w-3 h-3 text-amber-400" /> CVio Pro
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Kariyerinize<br /><span className="text-[#888]">yatırım yapın.</span>
          </h1>
          <p className="text-[#666] text-base max-w-md mx-auto">
            Tek bir iş görüşmesi, yıllık üyelik ücretini karşılar.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex p-1 rounded-lg border border-white/[0.08] bg-white/[0.03]">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2 rounded-md text-[13px] font-semibold transition-all ${
                billing === 'monthly' ? 'bg-white text-black' : 'text-[#666] hover:text-white'
              }`}
            >
              Aylık
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={`px-5 py-2 rounded-md text-[13px] font-semibold transition-all flex items-center gap-2 ${
                billing === 'annual' ? 'bg-white text-black' : 'text-[#666] hover:text-white'
              }`}
            >
              Yıllık
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                billing === 'annual' ? 'bg-black/10 text-black' : 'bg-emerald-500/15 text-emerald-400'
              }`}>
                %{savings}
              </span>
            </button>
          </div>
        </div>

        {/* Main Pricing Card */}
        <div className="max-w-lg mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            
            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-white">₺{currentPrice}</span>
                <span className="text-[#666] text-sm">/ay</span>
              </div>
              {billing === 'annual' && (
                <p className="text-[13px] text-[#666] mt-1">
                  ₺{annualTotal}/yıl · ₺{monthlyPrice * 12 - annualTotal} tasarruf
                </p>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={() => handleUpgrade(billing)}
              disabled={loading !== null}
              className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-[14px] hover:bg-slate-100 transition-colors disabled:opacity-70 flex items-center justify-center gap-2 mb-8"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Yükleniyor...</>
              ) : (
                <>Şimdi Başla — ₺{currentPrice}/ay</>
              )}
            </button>

            {/* Features */}
            <div className="space-y-3">
              {proFeatures.map(f => (
                <div key={f} className="flex items-center gap-3 text-[13px] text-[#aaa]">
                  <div className="w-5 h-5 rounded-full bg-white/[0.07] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  {f}
                </div>
              ))}
            </div>

            {/* Trust */}
            <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-center gap-6 text-[11px] text-[#555]">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> SSL şifreli
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> 14 gün iade
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> Anında aktif
              </span>
            </div>
          </div>
        </div>

        {/* Compare */}
        <div className="max-w-lg mx-auto mt-8">
          <div className="rounded-xl border border-white/[0.06] overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-5 py-3 text-left text-[#555] font-medium">Özellik</th>
                  <th className="px-5 py-3 text-center text-[#555] font-medium">Ücretsiz</th>
                  <th className="px-5 py-3 text-center text-white font-semibold">Pro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['CV oluşturma', 'Sınırsız', 'Sınırsız'],
                  ['Paylaşım bağlantısı', '7 gün', 'Kalıcı'],
                  ['AI içerik üretimi', '1 hak', 'Sınırsız'],
                  ['LinkedIn import', '—', '✓'],
                  ['Şablonlar', '1 şablon', 'Tümü'],
                  ['Analitik', '—', '✓'],
                ].map(([f, free, pro], i) => (
                  <tr key={f} className={`border-b border-white/[0.04] ${i % 2 ? 'bg-white/[0.01]' : ''}`}>
                    <td className="px-5 py-3 text-[#888]">{f}</td>
                    <td className="px-5 py-3 text-center text-[#555]">{free}</td>
                    <td className="px-5 py-3 text-center text-white font-medium">{pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function UpgradePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#060608] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    }>
      <UpgradeContent />
    </Suspense>
  );
}
