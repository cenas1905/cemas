'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase-client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Target, CheckCircle2, XCircle, Lightbulb, Activity } from 'lucide-react';

interface ATSMatchPageProps {
  params: Promise<{ slug: string }>;
}

export default function ATSMatchPage({ params }: ATSMatchPageProps) {
  const router = useRouter();
  const { slug } = use(params);
  const supabase = createClientComponentClient();

  const [cvData, setCvData] = useState<any>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Load CV on mount
  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('cvs')
        .select('*')
        .eq('id', slug)
        .eq('user_id', user.id)
        .single();

      if (error || !data) {
        alert('Özgeçmiş bulunamadı.');
        router.push('/dashboard');
        return;
      }

      setCvData(data.data);
      setLoading(false);
    }
    loadData();
  }, [slug, supabase, router]);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      alert('Lütfen bir iş ilanı metni yapıştırın.');
      return;
    }

    setAnalyzing(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai/job-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvData, jobDescription })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analiz sırasında bir hata oluştu.');
      }

      const resData = await response.json();
      setResult(resData.analysis);
    } catch (err: any) {
      alert(err.message || 'Analiz yapılamadı.');
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-slate-400">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <span>Analiz motoru hazırlanıyor...</span>
      </div>
    );
  }

  // Determine score color
  const scoreColor = result ? (result.score >= 80 ? 'text-emerald-400' : result.score >= 60 ? 'text-amber-400' : 'text-red-400') : 'text-white';

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-slate-900 pb-4">
        <Link href={`/dashboard/cv/${slug}/edit`}>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-indigo-400" />
            ATS İş İlanı Eşleştirme (AI)
          </h1>
          <p className="text-slate-400 text-sm mt-1">CV'nizi başvuracağınız ilanın kriterleriyle kıyaslayın ve eksiklerinizi görün.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Job Description Input */}
        <div className="space-y-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">1. İş İlanını Yapıştırın</h2>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="LinkedIn veya şirket sitesindeki iş ilanının tüm metnini buraya kopyalayıp yapıştırın (Aranan nitelikler, iş tanımı vb.)."
              className="min-h-[300px] bg-slate-950 border-slate-800 text-slate-200 resize-y"
            />
            <Button
              onClick={handleAnalyze}
              disabled={analyzing || !jobDescription.trim()}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 text-base shadow-lg shadow-indigo-500/20"
            >
              {analyzing ? (
                <>
                  <Activity className="w-5 h-5 mr-2 animate-pulse" />
                  Yapay Zeka Analiz Ediyor...
                </>
              ) : (
                <>
                  <Target className="w-5 h-5 mr-2" />
                  Eşleşmeyi Analiz Et
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Right: Results */}
        <div className="space-y-4">
          {!result && !analyzing && (
            <div className="h-full bg-slate-900/20 border border-slate-800 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <Target className="w-16 h-16 text-slate-700 mb-4" />
              <p className="text-slate-400 font-medium">Analiz sonucu burada görüntülenecek.</p>
              <p className="text-slate-500 text-sm mt-2 max-w-sm">İş ilanını yapıştırıp butona bastığınızda CV'nizin uyumluluk skoru saniyeler içinde hesaplanır.</p>
            </div>
          )}

          {analyzing && (
            <div className="h-full bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-6" />
              <h3 className="text-xl font-bold text-white animate-pulse">ATS Robotu Simüle Ediliyor</h3>
              <p className="text-slate-400 text-sm mt-2">CV'niz taranıyor, anahtar kelimeler eşleştiriliyor...</p>
            </div>
          )}

          {result && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Score */}
              <div className="flex items-center gap-6 pb-6 border-b border-slate-800">
                <div className={`text-6xl font-black ${scoreColor}`}>
                  %{result.score}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">ATS Uyum Skoru</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    {result.score >= 80 ? 'Harika! Bu iş için çok uygunsunuz.' : result.score >= 60 ? 'Fena değil, ufak iyileştirmeler gerekiyor.' : 'Bu ilan için CV\'nizi ciddi şekilde optimize etmelisiniz.'}
                  </p>
                </div>
              </div>

              {/* Strengths */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Güçlü Yönler (Eşleşenler)
                </h4>
                <ul className="space-y-2">
                  {result.strengths?.map((s: string, i: number) => (
                    <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gaps */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-400" />
                  Eksikler (Eşleşmeyenler)
                </h4>
                <ul className="space-y-2">
                  {result.gaps?.map((g: string, i: number) => (
                    <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span> {g}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              <div className="space-y-3 bg-indigo-950/30 p-4 rounded-xl border border-indigo-900/50">
                <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Yapay Zeka Önerileri
                </h4>
                <ul className="space-y-2">
                  {result.suggestions?.map((s: string, i: number) => (
                    <li key={i} className="text-indigo-100/80 text-sm flex items-start gap-2">
                      <span className="text-indigo-400 mt-0.5">→</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
