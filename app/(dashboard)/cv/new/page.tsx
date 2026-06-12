'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase-client';
import LinkedInImport from '@/components/cv-builder/LinkedInImport';
import { ArrowLeft, FileText, Linkedin, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function NewCVPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'choose' | 'linkedin'>('choose');

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('plan').eq('id', user.id).single();
        setProfile(data);
      }
    }
    load();
  }, [supabase]);

  const isPro = profile?.plan === 'pro' || profile?.plan === 'annual';

  const handleStartFromScratch = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.from('cvs').insert({
      user_id: user.id,
      title: 'Yeni Özgeçmiş',
      data: {
        personal: { fullName: '', headline: '', location: '', email: user.email || '', linkedin: '', summary: '', phone: '' },
        experience: [], education: [], skills: [], certifications: []
      },
      template: 'modern',
      is_public: false
    }).select().single();

    if (error) { alert(error.message); setLoading(false); }
    else router.push(`/cv/${data.id}/edit`);
  };

  const handleImportSuccess = async (importedData: any) => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.from('cvs').insert({
      user_id: user.id,
      title: `${importedData.personal?.fullName || 'LinkedIn'} — CV`,
      data: importedData,
      template: 'modern',
      is_public: false
    }).select().single();

    if (error) { alert(error.message); setLoading(false); }
    else router.push(`/cv/${data.id}/edit`);
  };

  if (mode === 'linkedin') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <button onClick={() => setMode('choose')} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Geri
        </button>
        <div>
          <h1 className="text-3xl font-black text-white mb-2">LinkedIn'den İmport</h1>
          <p className="text-slate-400 text-sm">Profil URL'nizi girin; tüm bilgilerinizi otomatik çekelim.</p>
        </div>
        <LinkedInImport onImportSuccess={handleImportSuccess} isPro={isPro} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back */}
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Dashboard'a Dön
      </Link>

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border"
          style={{ background:'rgba(99,102,241,0.1)', borderColor:'rgba(99,102,241,0.25)', color:'#a5b4fc' }}>
          <Sparkles className="w-3 h-3" /> Yeni Özgeçmiş
        </div>
        <h1 className="text-4xl font-black text-white">Nasıl başlamak istersiniz?</h1>
        <p className="text-slate-400 text-base max-w-md mx-auto">LinkedIn'den otomatik içe aktarın ya da sıfırdan kendiniz doldurun.</p>
      </div>

      {/* Option cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">

        {/* LinkedIn Import */}
        <button onClick={() => setMode('linkedin')}
          className="group relative p-8 rounded-2xl border text-left transition-all hover:-translate-y-1 hover:border-indigo-500/40 duration-300"
          style={{ background:'linear-gradient(180deg,rgba(13,18,32,0.9) 0%,rgba(9,13,26,0.9) 100%)', borderColor:'rgba(255,255,255,0.08)' }}>
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background:'linear-gradient(135deg,rgba(99,102,241,0.06) 0%,transparent 100%)' }} />

          <div className="relative space-y-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background:'rgba(10,102,194,0.15)', border:'1px solid rgba(10,102,194,0.25)' }}>
              <svg className="w-7 h-7" style={{ fill:'#0a66c2' }} viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-black text-white mb-2">LinkedIn'den İmport</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                LinkedIn profil URL'nizi yapıştırın. Apify teknolojisiyle tüm iş deneyimi, eğitim ve becerilerinizi <strong className="text-indigo-300">30 saniyede</strong> çekelim.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Otomatik doldurma', 'AI optimize', 'En hızlı yol'].map(tag => (
                <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full border"
                  style={{ background:'rgba(99,102,241,0.08)', borderColor:'rgba(99,102,241,0.2)', color:'#a5b4fc' }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mt-2">
              Başla <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </div>
          </div>
        </button>

        {/* From Scratch */}
        <button onClick={handleStartFromScratch} disabled={loading}
          className="group relative p-8 rounded-2xl border text-left transition-all hover:-translate-y-1 hover:border-white/15 duration-300 disabled:opacity-60"
          style={{ background:'linear-gradient(180deg,rgba(13,18,32,0.9) 0%,rgba(9,13,26,0.9) 100%)', borderColor:'rgba(255,255,255,0.08)' }}>
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background:'linear-gradient(135deg,rgba(255,255,255,0.02) 0%,transparent 100%)' }} />

          <div className="relative space-y-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
              <FileText className="w-7 h-7 text-slate-400" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white mb-2">Sıfırdan Başla</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Boş bir şablonla başlayın. Tüm bilgileri kendiniz adım adım doldurun. Tam kontrol sizde.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Tam kontrol', 'Hızlı form', 'Canlı önizleme'].map(tag => (
                <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full border"
                  style={{ background:'rgba(255,255,255,0.04)', borderColor:'rgba(255,255,255,0.08)', color:'#94a3b8' }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold mt-2">
              {loading ? 'Oluşturuluyor...' : <>Başla <span className="group-hover:translate-x-1 transition-transform inline-block">→</span></>}
            </div>
          </div>
        </button>
      </div>

      {/* Info bar */}
      <div className="flex items-center gap-3 p-4 rounded-xl border border-indigo-500/15"
        style={{ background:'rgba(99,102,241,0.05)' }}>
        <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
        <p className="text-sm text-slate-400">
          <span className="text-indigo-300 font-semibold">İpucu:</span> LinkedIn import kullanırsanız AI, CV'nizi hedeflediğiniz şirkete göre otomatik optimize eder.
          {!isPro && <Link href="/upgrade" className="text-amber-400 hover:text-amber-300 ml-1 underline underline-offset-2">Pro'ya geçin →</Link>}
        </p>
      </div>
    </div>
  );
}
