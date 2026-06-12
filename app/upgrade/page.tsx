'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase-client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Check, Sparkles, Zap, Shield, ArrowLeft,
  ChevronRight, Star, Award, Clock
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }
  })
};

const monthlyFeatures = [
  'Kalıcı paylaşım linki (asla silinmez)',
  'Şirkete özel URL (/cv/adınız-şirket)',
  'Tüm premium CV şablonları',
  'Sınırsız PDF indirme',
  'AI Kariyer Koçu sohbeti (sınırsız)',
  'Sınırsız AI içerik iyileştirme',
  'Gerçek zamanlı görüntülenme analitiği',
  'Cover letter oluşturucu',
  'Job matching (iş eşleştirme)',
  'Öncelikli müşteri desteği',
];

const annualExtras = [
  'Aylık plan\'daki her şey +',
  'Öncelikli AI işlem sırası',
  'Yeni özelliklere erken erişim',
  '1 yıllık veri saklama garantisi',
  'Özel onboarding seansı',
];

const faqs = [
  { q: 'İstediğim zaman iptal edebilir miyim?', a: 'Evet, istediğiniz zaman iptal edebilirsiniz. İptal ettikten sonra abonelik sürenizin sonuna kadar Pro özelliklerine erişiminiz devam eder.' },
  { q: 'Para iade garantisi var mı?', a: 'Evet! İlk 14 gün içinde memnun kalmazsanız ücretin tamamını iade ediyoruz. Hiç soru sormuyoruz.' },
  { q: 'Mevcut CV\'lerim silinir mi?', a: 'Hayır. Ücretsiz plana geçseniz bile CV içerikleriniz hesabınızda kalır. Yalnızca kalıcı linkler geçici linklere dönüşür.' },
  { q: 'Ödeme güvenli mi?', a: 'Tüm ödemeler Stripe ile işlenir. Kart bilgileriniz sunucularımızda saklanmaz.' },
];

export default function UpgradePage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    }
    loadUser();
  }, [supabase]);

  const handleUpgrade = async (planType: 'monthly' | 'annual') => {
    if (!userId) {
      router.push('/register');
      return;
    }

    setLoading(planType);
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType,
          userId,
          returnUrl: window.location.origin + '/upgrade'
        })
      });

      if (!response.ok) {
        throw new Error('Abonelik başlatılamadı.');
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Ödeme sayfasına yönlendirilemedi.');
      }
    } catch (err: any) {
      alert(err.message || 'Ödeme oturumu başlatılamadı, lütfen tekrar deneyin.');
    } finally {
      setLoading(null);
    }
  };

  const monthlyPrice = 199;
  const annualPrice = 1490;
  const annualMonthly = Math.round(annualPrice / 12);
  const savings = Math.round((1 - annualPrice / (monthlyPrice * 12)) * 100);

  return (
    <div className="min-h-screen bg-[#03060b] text-white">

      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-500/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* ── Back + Header ── */}
        <div className="space-y-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Dashboard'a dön
          </Link>

          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="text-center space-y-4 max-w-3xl mx-auto">
            <motion.div custom={0} variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20">
                <Sparkles className="w-3 h-3" /> CVio Pro
              </span>
            </motion.div>
            <motion.h1 custom={1} variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight">
              Kariyerinize <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Yatırım Yapın</span>
            </motion.h1>
            <motion.p custom={2} variants={fadeUp} className="text-slate-400 text-lg max-w-xl mx-auto">
              Tek bir mülakat daveti, aboneliğinizin maliyetini çıkarır. Rakiplerinizin önüne geçin.
            </motion.p>

            {/* Social proof */}
            <motion.div custom={3} variants={fadeUp} className="flex items-center justify-center gap-5 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.9/5 puan</span>
              <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-emerald-500" /> 2.400+ Pro kullanıcı</span>
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-blue-400" /> 14 gün iade garantisi</span>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Billing toggle ── */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/8">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${billing === 'monthly' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Aylık
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${billing === 'annual' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Yıllık
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">%{savings} İNDİRİM</span>
            </button>
          </div>
        </div>

        {/* ── Pricing cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

          {/* Pro Monthly */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className={`h-full rounded-2xl border p-8 flex flex-col transition-all ${billing === 'monthly' ? 'border-indigo-500/40 bg-indigo-500/5' : 'border-white/8 bg-white/2'}`}>
              <div className="mb-6">
                <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-2">PRO AYLIK</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white">₺{monthlyPrice}</span>
                  <span className="text-slate-400 text-sm">/ay</span>
                </div>
                <p className="text-slate-500 text-sm mt-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Her ay yenilenir · İstediğin zaman iptal
                </p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {monthlyFeatures.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-indigo-400" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleUpgrade('monthly')}
                disabled={loading !== null}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold h-12 shadow-xl shadow-indigo-500/20 transition-all hover:scale-[1.02] text-base"
              >
                {loading === 'monthly' ? 'Başlatılıyor...' : <>Aylık Pro'ya Başla <ChevronRight className="w-4 h-4 ml-1" /></>}
              </Button>
            </div>
          </motion.div>

          {/* Pro Annual */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="relative h-full">
              {/* Glow border */}
              <div className="absolute -inset-px bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-60" />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <span className="px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[11px] font-black shadow-lg shadow-amber-500/30">
                  4 AY BEDAVA 🎉
                </span>
              </div>
              <div className="relative h-full rounded-2xl bg-[#0c0e18] border-0 p-8 flex flex-col">
                <div className="mb-6">
                  <p className="text-xs text-amber-400 font-bold uppercase tracking-widest mb-2">PRO YILLIK</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-white">₺{annualMonthly}</span>
                    <span className="text-slate-400 text-sm">/ay</span>
                  </div>
                  <p className="text-amber-400 text-sm mt-1 font-semibold">₺{annualPrice}/yıl — ₺{Math.round(monthlyPrice * 12 - annualPrice)} tasarruf</p>
                  <p className="text-slate-500 text-sm mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Yıllık faturalandırılır
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {annualExtras.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-200">
                      <div className="w-4 h-4 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-amber-400" />
                      </div>
                      {f}
                    </li>
                  ))}
                  <li className="text-xs text-slate-500 italic ml-6.5">+ aylık plandaki tüm özellikler</li>
                </ul>
                <Button
                  onClick={() => handleUpgrade('annual')}
                  disabled={loading !== null}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black h-12 shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.02] text-base"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {loading === 'annual' ? 'Başlatılıyor...' : 'Yıllık Pro\'ya Başla'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Feature comparison table ── */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-white text-center mb-8">Özellik Karşılaştırması</h2>
          <div className="rounded-2xl border border-white/8 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-white/2">
                  <th className="text-left px-6 py-4 text-slate-400 font-semibold">Özellik</th>
                  <th className="text-center px-6 py-4 text-slate-400 font-semibold">Ücretsiz</th>
                  <th className="text-center px-6 py-4 text-indigo-400 font-semibold">Pro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['CV oluşturma', 'Sınırsız', 'Sınırsız'],
                  ['CV şablonları', '1 şablon', 'Tüm şablonlar'],
                  ['PDF indirme', '7 gün', 'Sınırsız'],
                  ['Paylaşım linki', '7 gün geçici', 'Kalıcı ✓'],
                  ['Şirkete özel URL', '✗', '✓'],
                  ['AI içerik iyileştirme', '1 hak', 'Sınırsız'],
                  ['AI optimizasyon', '✗', '✓'],
                  ['AI Kariyer Koçu', '✗', 'Sınırsız'],
                  ['Görüntülenme analitiği', '✗', '✓'],
                  ['Cover letter oluşturucu', '✗', '✓'],
                ].map(([feature, free, pro], i) => (
                  <tr key={feature} className={`border-b border-white/5 ${i % 2 === 0 ? '' : 'bg-white/1'}`}>
                    <td className="px-6 py-3.5 text-slate-300">{feature}</td>
                    <td className="px-6 py-3.5 text-center text-slate-500">{free}</td>
                    <td className="px-6 py-3.5 text-center text-indigo-300 font-medium">{pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-black text-white text-center mb-8">Sık Sorulan Sorular</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-xl border border-white/8 bg-white/2 space-y-2">
              <h3 className="text-base font-semibold text-white">{faq.q}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* ── Trust badges ── */}
        <div className="text-center space-y-3">
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-500" /> 256-bit SSL şifreleme</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-500" /> Stripe ile güvenli ödeme</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-500" /> 14 gün para iade garantisi</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-emerald-500" /> Anında aktivasyon</span>
          </div>
        </div>

      </div>
    </div>
  );
}
