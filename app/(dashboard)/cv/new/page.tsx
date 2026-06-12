'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase-client';
import { ArrowLeft, Sparkles, Check, FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    desc: 'Yazılım ve teknoloji sektörleri için ideal, temiz ve şık düzen.',
    previewColor: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400'
  },
  {
    id: 'klasik',
    name: 'Klasik',
    desc: 'Kurumsal ve geleneksel sektörler için uygun, dengeli ve profesyonel.',
    previewColor: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    desc: 'Akademik ve minimal tasarımlar için mükemmel, yalın ve net.',
    previewColor: 'bg-purple-500/20 border-purple-500/40 text-purple-400'
  }
];

export default function NewCVPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [title, setTitle] = useState('Yeni Özgeçmiş');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [loading, setLoading] = useState(false);

  const handleCreateCV = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    const { data, error } = await supabase.from('cvs').insert({
      user_id: user.id,
      title: title.trim() || 'Yeni Özgeçmiş',
      data: {
        personal: { fullName: user.user_metadata?.full_name || '', headline: '', location: '', email: user.email || '', linkedin: '', summary: '', phone: '' },
        experience: [],
        education: [],
        skills: [],
        certifications: []
      },
      template: selectedTemplate,
      is_public: false
    }).select().single();

    if (error) {
      alert(`CV oluşturulurken hata oluştu: ${error.message}`);
      setLoading(false);
    } else {
      router.push(`/cv/${data.id}/edit`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Back to Dashboard */}
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Dashboard'a Dön
      </Link>

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border"
          style={{ background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.25)', color: '#a5b4fc' }}>
          <Sparkles className="w-3 h-3 animate-pulse" /> Yeni Özgeçmiş
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight">Özgeçmişinizi Oluşturun</h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">Başlamak için CV başlığınızı girin ve şablon seçiminizi yapın.</p>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-white/8 p-8"
        style={{ background: 'linear-gradient(180deg, rgba(13,18,32,0.85) 0%, rgba(9,13,26,0.85) 100%)' }}>
        <form onSubmit={handleCreateCV} className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="cv-title" className="text-slate-200 text-xs font-semibold">Özgeçmiş Başlığı</Label>
            <div className="relative">
              <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                id="cv-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: Yazılım Mühendisi Özgeçmişi"
                required
                className="w-full pl-10 bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-indigo-500 text-sm"
              />
            </div>
            <p className="text-[10px] text-slate-500">
              Bu başlık yalnızca panosunuzda düzeni sağlamak için kullanılır, CV üzerinde görünmez.
            </p>
          </div>

          <hr className="border-white/5" />

          {/* Template Selection */}
          <div className="space-y-3">
            <Label className="text-slate-200 text-xs font-semibold">Tasarım Şablonu</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((tmpl) => (
                <div
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  className={`group relative p-5 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedTemplate === tmpl.id
                      ? 'border-indigo-500/60 bg-indigo-500/5'
                      : 'border-white/5 bg-white/2 hover:border-white/10 hover:bg-white/4'
                  }`}
                >
                  {selectedTemplate === tmpl.id && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div className="space-y-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${tmpl.previewColor} border`}>
                      Aa
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{tmpl.name}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{tmpl.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-6 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.01] bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 shadow-xl shadow-indigo-500/20"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Devam Et ve Doldur</>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
