'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase-client';
import { ArrowLeft, Sparkles, Check, Globe, Wand2, Loader2, ArrowRight, PenLine, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const templates = [
  { id: 'modern', name: 'Modern', desc: 'Tech & Yazılım', color: 'bg-indigo-500' },
  { id: 'professional', name: 'Profesyonel', desc: 'Kurumsal & Resmi', color: 'bg-emerald-500' },
  { id: 'minimal', name: 'Minimal', desc: 'Yalın & Akademik', color: 'bg-zinc-500' },
  { id: 'warm', name: 'Sıcak', desc: 'Tasarım & Kreatif', color: 'bg-amber-500' }
];

function NewCVContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();
  
  const defaultTab = searchParams.get('mode') === 'linkedin' ? 'linkedin' : 'manual';

  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [title, setTitle] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progressText, setProgressText] = useState('');

  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      const { data: prof } = await supabase.from('profiles').select('plan').eq('id', user.id).maybeSingle();
      setProfile(prof);
    }
    loadProfile();
  }, [supabase, router]);

  const handleErrorParser = (errorData: any, defaultMsg: string) => {
    let msg = errorData.error?.message || errorData.error || errorData.message || defaultMsg;
    if (typeof msg === 'string' && msg.toLowerCase().includes('credit balance')) {
      return 'Yapay zeka servisinde bakiye yetersizliği mevcut. Lütfen Pro plana yükseltin veya API anahtarınızı kontrol edin.';
    }
    // Object serialization fallback
    if (typeof msg === 'object') {
      msg = JSON.stringify(msg);
      if (msg.toLowerCase().includes('credit balance')) {
        return 'Yapay zeka servisinde bakiye yetersizliği mevcut. Lütfen Pro plana yükseltin veya API anahtarınızı kontrol edin.';
      }
    }
    return typeof msg === 'string' ? msg : defaultMsg;
  };

  const handleCreateManual = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProgressText('Özgeçmiş oluşturuluyor...');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Oturum bulunamadı.');

      const response = await fetch('/api/cv/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim() || 'Yeni Özgeçmiş',
          data: {
            personal: { fullName: user.user_metadata?.full_name || '', headline: '', location: '', email: user.email || '', linkedin: '', summary: '', photo: '' },
            experience: [],
            education: [],
            skills: [],
            certifications: []
          },
          template: selectedTemplate,
          is_public: false
        })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'CV oluşturulurken bir hata oluştu.');
      }

      router.push(`/dashboard/cv/${result.cv.id}/edit`);
    } catch (err: any) {
      setError(err.message || 'CV oluşturulurken bir hata oluştu.');
      setLoading(false);
    }
  };

  const handleCreateLinkedIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkedinUrl.includes('linkedin.com/')) {
      setError('Lütfen geçerli bir LinkedIn URL adresi girin.');
      return;
    }

    setLoading(true);
    setError(null);
    setProgressText('Profiliniz yapay zeka ile analiz ediliyor...');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Oturum bulunamadı.');

      const response = await fetch('/api/linkedin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkedinUrl })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(handleErrorParser(errorData, 'Profil çekilirken bir hata oluştu.'));
      }

      setProgressText('Veritabanına kaydediliyor ve PDF oluşturuluyor...');
      const importResult = await response.json();
      const newTitle = `${importResult.data.personal?.fullName || 'LinkedIn'} Özgeçmişi`;

      const saveResponse = await fetch('/api/cv/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          data: importResult.data,
          template: selectedTemplate,
          is_public: false
        })
      });

      const saveResult = await saveResponse.json();
      if (!saveResponse.ok) {
        throw new Error(saveResult.error || 'İçe aktarılan profil kaydedilemedi.');
      }

      router.push(`/dashboard/cv/${saveResult.cv.id}/edit`);
    } catch (err: any) {
      setError(err.message || 'LinkedIn profiliniz çekilirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAIPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setLoading(true);
    setError(null);
    setProgressText('Claude yapay zekası CV\'nizi oluşturuyor...');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Oturum bulunamadı.');

      const response = await fetch('/api/ai/generate-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(handleErrorParser(errorData, 'Yapay zeka CV üretemedi.'));
      }

      const aiResult = await response.json();
      const newTitle = `${aiResult.data.personal?.fullName || 'Yapay Zeka'} Özgeçmişi`;

      setProgressText('Veritabanına kaydediliyor ve PDF oluşturuluyor...');
      const saveResponse = await fetch('/api/cv/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          data: aiResult.data,
          template: selectedTemplate,
          is_public: false
        })
      });

      const saveResult = await saveResponse.json();
      if (!saveResponse.ok) {
        throw new Error(saveResult.error || 'Yapay zeka CV verisi kaydedilemedi.');
      }

      router.push(`/dashboard/cv/${saveResult.cv.id}/edit`);
    } catch (err: any) {
      setError(err.message || 'CV oluşturulurken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10 py-6 font-sans">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-white transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Geri Dön
      </Link>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Yeni Özgeçmiş</h1>
        <p className="text-slate-400 text-sm">Nasıl başlamak istersiniz? Yapay zeka gücünü kullanın veya sıfırdan oluşturun.</p>
      </div>

      <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-hidden shrink-0 w-full sm:w-auto overflow-x-auto no-scrollbar">
        {[
          { id: 'ai', label: 'AI ile Üret', icon: <Wand2 className="w-4 h-4" /> },
          { id: 'linkedin', label: 'LinkedIn', icon: <Globe className="w-4 h-4" /> },
          { id: 'manual', label: 'Manuel Başla', icon: <PenLine className="w-4 h-4" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setError(null); }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.icon}
            <span className="whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="relative">
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3 leading-relaxed">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold mb-1">Bir Hata Oluştu</div>
              <div>{error}</div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-xl bg-indigo-500/30 animate-pulse"></div>
              <Loader2 className="w-10 h-10 text-indigo-400 animate-spin relative z-10" />
            </div>
            <p className="text-white font-bold mt-6">İşleminiz Yapılıyor</p>
            <p className="text-slate-400 text-sm mt-2 max-w-xs text-center">{progressText}</p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'manual' && (
              <form onSubmit={handleCreateManual} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white">Özgeçmiş Adı</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Örn: Kıdemli Yazılım Geliştirici"
                    required
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white">Şablon Seçimi</label>
                  <div className="grid grid-cols-2 gap-3">
                    {templates.map((tmpl) => (
                      <div
                        key={tmpl.id}
                        onClick={() => setSelectedTemplate(tmpl.id)}
                        className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center gap-3 ${
                          selectedTemplate === tmpl.id ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full ${tmpl.color} ${selectedTemplate === tmpl.id ? 'ring-2 ring-offset-2 ring-offset-[#03060b] ring-indigo-500' : ''}`}></div>
                        <div>
                          <div className={`font-semibold text-sm ${selectedTemplate === tmpl.id ? 'text-white' : 'text-slate-300'}`}>{tmpl.name}</div>
                        </div>
                        {selectedTemplate === tmpl.id && <Check className="w-4 h-4 text-indigo-400 ml-auto" />}
                      </div>
                    ))}
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                  Oluştur ve Düzenle <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {activeTab === 'linkedin' && (
              <form onSubmit={handleCreateLinkedIn} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white flex items-center justify-between">
                    LinkedIn Profil Linki
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30 flex items-center gap-1"><Sparkles className="w-3 h-3"/> AI Destekli</span>
                  </label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/profiliniz"
                    required
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                  <p className="text-xs text-slate-500">Gizli olmayan ve herkese açık LinkedIn profil URL'nizi girin. Profiliniz analiz edilip en iyi hale getirilecektir.</p>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white">Şablon Seçimi</label>
                  <div className="grid grid-cols-2 gap-3">
                    {templates.map((tmpl) => (
                      <div
                        key={tmpl.id}
                        onClick={() => setSelectedTemplate(tmpl.id)}
                        className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center gap-3 ${
                          selectedTemplate === tmpl.id ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full ${tmpl.color} ${selectedTemplate === tmpl.id ? 'ring-2 ring-offset-2 ring-offset-[#03060b] ring-indigo-500' : ''}`}></div>
                        <div>
                          <div className={`font-semibold text-sm ${selectedTemplate === tmpl.id ? 'text-white' : 'text-slate-300'}`}>{tmpl.name}</div>
                        </div>
                        {selectedTemplate === tmpl.id && <Check className="w-4 h-4 text-indigo-400 ml-auto" />}
                      </div>
                    ))}
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                  İçe Aktar ve Üret <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {activeTab === 'ai' && (
              <form onSubmit={handleCreateAIPrompt} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white flex items-center justify-between">
                    Kariyer Özeti (Prompt)
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30 flex items-center gap-1"><Sparkles className="w-3 h-3"/> AI Destekli</span>
                  </label>
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Kendinizden, çalıştığınız yerlerden ve tecrübelerinizden bahsedin. Örneğin: 'Ben Ahmet, 5 yıldır Frontend geliştiriciyim. React ve Next.js uzmanıyım. X şirketinde 3 yıl çalıştım...'"
                    required
                    rows={6}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                  />
                  <p className="text-xs text-slate-500">Ne kadar detay verirseniz, yapay zeka sizin için o kadar dolgun ve profesyonel bir CV oluşturur.</p>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white">Şablon Seçimi</label>
                  <div className="grid grid-cols-2 gap-3">
                    {templates.map((tmpl) => (
                      <div
                        key={tmpl.id}
                        onClick={() => setSelectedTemplate(tmpl.id)}
                        className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center gap-3 ${
                          selectedTemplate === tmpl.id ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full ${tmpl.color} ${selectedTemplate === tmpl.id ? 'ring-2 ring-offset-2 ring-offset-[#03060b] ring-indigo-500' : ''}`}></div>
                        <div>
                          <div className={`font-semibold text-sm ${selectedTemplate === tmpl.id ? 'text-white' : 'text-slate-300'}`}>{tmpl.name}</div>
                        </div>
                        {selectedTemplate === tmpl.id && <Check className="w-4 h-4 text-indigo-400 ml-auto" />}
                      </div>
                    ))}
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                  Sihirli Özgeçmiş Yarat <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function NewCVPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-20 font-sans">
        <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
        <p className="text-white font-bold mt-4">Yükleniyor...</p>
      </div>
    }>
      <NewCVContent />
    </Suspense>
  );
}