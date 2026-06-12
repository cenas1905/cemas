'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Check, Sparkles, Zap, Shield, ArrowLeft,
  ChevronRight, Star, Award, Clock, X
} from 'lucide-react';

const features = [
  { text: 'Kalıcı paylaşım linki (asla silinmez)', pro: true },
  { text: 'Şirkete özel URL (/cv/adınız-şirket)', pro: true },
  { text: 'Tüm premium CV şablonları', pro: true },
  { text: 'Sınırsız PDF indirme', pro: true },
  { text: 'AI Kariyer Koçu (sınırsız)', pro: true },
  { text: 'Sınırsız LinkedIn import', pro: true },
  { text: 'Gerçek zamanlı görüntülenme analitiği', pro: true },
  { text: 'Cover letter oluşturucu', pro: true },
  { text: 'Job matching (iş eşleştirme)', pro: true },
  { text: 'Öncelikli müşteri desteği', pro: true },
];

const faqs = [
  { q: 'İstediğim zaman iptal edebilir miyim?', a: 'Evet, istediğiniz zaman iptal edebilirsiniz. İptal ettikten sonra dönem sonuna kadar Pro kullanmaya devam edersiniz.' },
  { q: '14 gün iade garantisi nasıl çalışır?', a: 'İlk 14 gün içinde memnun kalmazsanız ücretin tamamını iade ediyoruz. Hiç soru sormuyoruz.' },
  { q: 'Fiyatlar TL mi?', a: 'Evet, tüm fiyatlar Türk Lirası cinsindendir.' },
  { q: 'Mevcut CV\'lerim silinir mi?', a: 'Hayır. İçerikleriniz kalır. Yalnızca kalıcı linkler geçici olur.' },
];

const comparison = [
  ['CV oluşturma', 'Sınırsız', 'Sınırsız'],
  ['CV şablonları', '1', 'Tümü'],
  ['PDF indirme', '7 gün', 'Sınırsız'],
  ['Paylaşım linki', '7 gün', 'Kalıcı ✓'],
  ['Şirkete özel URL', '✗', '✓'],
  ['LinkedIn import', '1 hak', 'Sınırsız'],
  ['AI optimizasyon', '✗', '✓'],
  ['AI Kariyer Koçu', '✗', 'Sınırsız'],
  ['Analitik', '✗', '✓'],
  ['Ön yazı oluşturucu', '✗', '✓'],
];

export default function UpgradePage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const monthlyPrice = 199;
  const annualPrice = 1490;
  const annualMonthly = Math.round(annualPrice / 12);
  const savings = Math.round((1 - annualPrice / (monthlyPrice * 12)) * 100);

  return (
    <div className="min-h-screen bg-[#05080f] text-white">
      <div className="pointer-events-none fixed inset-0 z-0 dot-pattern opacity-60" />
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] z-0 animate-glow"
        style={{ background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.15) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Dashboard'a dön
        </Link>

        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border"
            style={{ background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.25)', color: '#a5b4fc' }}>
            <Sparkles className="w-3 h-3" /> CVio Pro
          </span>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight">
            Kariyerinize <span className="gradient-text">Yatırım Yapın</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Tek bir mülakat daveti, aboneliğinizin maliyetini çıkarır.
          </p>
          <div className="flex items-center justify-center gap-5 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.9/5</span>
            <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-emerald-500" /> 2.400+ kullanıcı</span>
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-blue-400" /> 14 gün iade</span>
          </div>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1 p-1 rounded-xl border border-white/8" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <button onClick={() => setBilling('monthly')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${billing === 'monthly' ? 'bg-white/10 text-white' : 'text-slate-400'}`}>
              Aylık
            </button>
            <button onClick={() => setBilling('annual')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${billing === 'annual' ? 'bg-white/10 text-white' : 'text-slate-400'}`}>
              Yıllık
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.25)' }}>
                %{savings} İNDİRİM
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

          {/* Monthly */}
          <div className={`rounded-2xl border p-8 flex flex-col transition-all ${billing === 'monthly' ? 'border-indigo-500/40' : 'border-white/8'}`}
            style={{ background: billing === 'monthly' ? 'linear-gradient(180deg,#0f1428,#0a0e1a)' : 'linear-gradient(180deg,rgba(13,18,32,0.9),rgba(9,13,26,0.9))' }}>
            <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-2">PRO AYLIK</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-5xl font-black text-white">₺{monthlyPrice}</span>
              <span className="text-slate-400 text-sm">/ay</span>
            </div>
            <p className="text-slate-500 text-sm mb-6 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Her ay yenilenir · İstediğin zaman iptal
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              {features.map(f => (
                <li key={f.text} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}>
                    <Check className="w-2.5 h-2.5 text-indigo-400" />
                  </div>
                  {f.text}
                </li>
              ))}
            </ul>
            <button className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 20px rgba(99,102,241,0.25)' }}>
              Aylık Pro'ya Başla <ChevronRight className="w-4 h-4 inline ml-1" />
            </button>
          </div>

          {/* Annual */}
          <div className="relative">
            <div className="absolute -inset-px rounded-2xl" style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)', opacity: 0.6 }} />
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
              <span className="px-4 py-1.5 rounded-full text-[11px] font-black text-slate-950"
                style={{ background: 'linear-gradient(135deg,#f59e0b,#fbbf24)', boxShadow: '0 4px 16px rgba(245,158,11,0.4)' }}>
                4 AY BEDAVA 🎉
              </span>
            </div>
            <div className="relative h-full rounded-2xl p-8 flex flex-col" style={{ background: '#0c0e18' }}>
              <p className="text-xs text-amber-400 font-bold uppercase tracking-widest mb-2">PRO YILLIK</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-black text-white">₺{annualMonthly}</span>
                <span className="text-slate-400 text-sm">/ay</span>
              </div>
              <p className="text-amber-400 text-sm font-semibold">₺{annualPrice}/yıl — ₺{monthlyPrice * 12 - annualPrice} tasarruf</p>
              <p className="text-slate-500 text-sm mb-6 flex items-center gap-1.5 mt-1">
                <Clock className="w-3.5 h-3.5" /> Yıllık faturalandırılır
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {['Pro\'daki her şey +', 'Öncelikli AI işlem sırası', 'Yeni özelliklere erken erişim', '14 gün iade garantisi', '1 yıllık veri güvencesi'].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)' }}>
                      <Check className="w-2.5 h-2.5 text-amber-400" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3.5 rounded-xl font-black text-sm text-slate-950 transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg,#f59e0b,#fbbf24)', boxShadow: '0 4px 20px rgba(245,158,11,0.3)' }}>
                <Zap className="w-4 h-4 inline mr-1.5" /> Yıllık Pro'ya Başla
              </button>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-8">Özellik Karşılaştırması</h2>
          <div className="rounded-2xl border border-white/8 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <th className="text-left px-6 py-4 text-slate-400 font-semibold">Özellik</th>
                  <th className="text-center px-6 py-4 text-slate-400 font-semibold">Ücretsiz</th>
                  <th className="text-center px-6 py-4 text-indigo-400 font-semibold">Pro</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([feature, free, pro], i) => (
                  <tr key={feature} className="border-b border-white/4" style={{ background: i % 2 === 1 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                    <td className="px-6 py-3.5 text-slate-300">{feature}</td>
                    <td className="px-6 py-3.5 text-center text-slate-500">{free}</td>
                    <td className="px-6 py-3.5 text-center text-indigo-300 font-medium">{pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-black text-white text-center mb-8">Sık Sorulan Sorular</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-white/7 overflow-hidden"
              style={{ background: 'rgba(13,18,32,0.7)' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-semibold text-white hover:bg-white/2 transition-colors">
                {faq.q}
                <span className={`transition-transform shrink-0 ml-4 text-slate-500 ${openFaq === i ? 'rotate-45' : ''}`}>
                  {openFaq === i ? <X className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trust */}
        <div className="text-center flex flex-wrap justify-center gap-6 text-xs text-slate-500">
          {[
            ['SSL şifreleme', Shield],
            ['Stripe ile ödeme', Check],
            ['14 gün iade', Clock],
            ['Anında aktivasyon', Zap],
          ].map(([t, Icon]: any) => (
            <span key={t} className="flex items-center gap-1.5"><Icon className="w-4 h-4 text-emerald-400" /> {t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
