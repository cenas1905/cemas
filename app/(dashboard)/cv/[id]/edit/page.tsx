'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase-client';
import Link from 'next/link';
import CVForm from '@/components/cv-builder/CVForm';
import CVPreview from '@/components/cv-builder/CVPreview';
import TemplateSelector, { CVTemplate } from '@/components/cv-builder/TemplateSelector';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, ChevronRight, Wand2, Sparkles, CheckCircle } from 'lucide-react';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

interface EditCVPageProps {
  params: Promise<{ id: string }>;
}

export default function EditCVPage({ params }: EditCVPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const supabase = createClientComponentClient();

  const [title, setTitle] = useState('Yükleniyor...');
  const [template, setTemplate] = useState<CVTemplate>('modern');
  const [cvData, setCvData] = useState<any>({
    personal: { fullName: '', headline: '', location: '', email: '', linkedin: '', summary: '' },
    experience: [], education: [], skills: [], certifications: []
  });

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [optimizeModalOpen, setOptimizeModalOpen] = useState(false);
  const [targetCompany, setTargetCompany] = useState('');

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: prof } = await supabase.from('profiles').select('plan').eq('id', user.id).single();
      setProfile(prof);

      const { data, error } = await supabase.from('cvs').select('*').eq('id', id).eq('user_id', user.id).single();
      if (error || !data) { router.push('/dashboard'); return; }

      setTitle(data.title);
      setTemplate(data.template as CVTemplate);
      if (data.data) setCvData(data.data);
      setLoading(false);
    }
    load();
  }, [id, supabase, router]);

  const isPro = profile?.plan === 'pro' || profile?.plan === 'annual';

  const handleSave = async (silent = false) => {
    setSaving(true);
    const { error } = await supabase.from('cvs').update({
      title, data: cvData, template, updated_at: new Date().toISOString()
    }).eq('id', id);
    setSaving(false);
    if (error) alert(error.message);
    else if (!silent) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };

  const handleAIOptimize = async () => {
    setOptimizeModalOpen(false);
    setOptimizing(true);
    try {
      const res = await fetch('/api/ai/improve-cv', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvData, targetCompany: targetCompany.trim() || undefined })
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || 'Başarısız'); }
      const result = await res.json();
      setCvData(result.data);
      setTimeout(() => handleSave(true), 500);
    } catch (err: any) { alert(err.message); }
    finally { setOptimizing(false); setTargetCompany(''); }
  };

  const saveAndProceed = async () => { await handleSave(true); router.push(`/cv/${id}/preview`); };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-3 rounded-full animate-spin mb-4"
          style={{ borderColor: 'rgba(99,102,241,0.2)', borderTopColor: '#6366f1' }} />
        <p className="text-slate-500 text-sm">Özgeçmiş yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Top bar ── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-5 border-b border-white/6">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link href="/dashboard">
            <button className="w-9 h-9 rounded-xl border border-white/8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="CV Başlığı"
            className="bg-transparent border-none text-xl font-black text-white focus-visible:ring-0 px-0 h-auto" />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          {/* AI Optimize */}
          <button onClick={() => setOptimizeModalOpen(true)} disabled={optimizing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 border"
            style={{ background: 'rgba(139,92,246,0.08)', borderColor: 'rgba(139,92,246,0.25)', color: '#a78bfa' }}>
            <Wand2 className="w-4 h-4" />
            {optimizing ? 'Optimize ediliyor...' : 'AI Optimize'}
          </button>

          {/* Save */}
          <button onClick={() => handleSave()} disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-white/8 text-slate-300 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50">
            {saved ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
            {saving ? 'Kaydediliyor...' : saved ? 'Kaydedildi!' : 'Kaydet'}
          </button>

          {/* Next step */}
          <button onClick={saveAndProceed}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 16px rgba(99,102,241,0.25)' }}>
            Devam Et <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Editor layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left — form */}
        <div className="lg:col-span-5 space-y-5">
          <TemplateSelector selected={template} onChange={setTemplate} isPro={isPro} />
          <CVForm cvData={cvData} setCvData={setCvData} onOptimize={handleAIOptimize} optimizing={optimizing} />
        </div>

        {/* Right — preview */}
        <div className="lg:col-span-7 sticky top-24">
          <div className="rounded-2xl border border-white/6 overflow-hidden" style={{ background: 'rgba(13,18,32,0.6)' }}>
            <div className="px-5 py-3 border-b border-white/6 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Canlı Önizleme (A4)</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[78vh]">
              <CVPreview data={cvData} template={template} />
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Optimize Dialog ── */}
      <Dialog open={optimizeModalOpen} onOpenChange={setOptimizeModalOpen}>
        <DialogContent className="border-white/8 text-white max-w-sm" style={{ background: '#0d1220' }}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" /> Şirkete Özel AI Optimizasyon
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs mt-2">
              Hedef şirketin adını girin. Claude AI, CV'nizi bu şirketin kültürüne ve beklentilerine göre yeniden yazacak.
            </DialogDescription>
          </DialogHeader>
          <div className="py-3">
            <label className="text-xs font-medium text-slate-300 mb-1.5 block">Şirket Adı (isteğe bağlı)</label>
            <input value={targetCompany} onChange={e => setTargetCompany(e.target.value)}
              placeholder="Google, Trendyol, Getir..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-white/8 bg-white/4 text-white placeholder-slate-600 text-sm outline-none focus:border-indigo-500/50 transition-all" />
          </div>
          <DialogFooter className="gap-2">
            <button onClick={() => setOptimizeModalOpen(false)} className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">İptal</button>
            <button onClick={handleAIOptimize}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <Wand2 className="w-4 h-4 inline mr-1.5" /> Optimize Et
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
