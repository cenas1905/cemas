'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase-client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MessageSquare, Play, Sparkles, User, CheckCircle2, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function InterviewPrepPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  const supabase = createClientComponentClient();

  const [loading, setLoading] = useState(true);
  const [cvTitle, setCvTitle] = useState('');
  const [cvData, setCvData] = useState<any>(null);

  const [jobDesc, setJobDesc] = useState('');
  const [generating, setGenerating] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  
  const [answers, setAnswers] = useState<string[]>([]);
  const [evaluating, setEvaluating] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    async function loadCV() {
      const { data, error } = await supabase.from('cvs').select('title, data').eq('id', slug).single();
      if (data) {
        setCvTitle(data.title);
        setCvData(data.data);
      }
      setLoading(false);
    }
    loadCV();
  }, [slug]);

  const handleGenerateQuestions = async () => {
    if (!jobDesc.trim()) return alert('Lütfen hedeflediğiniz iş ilanını girin.');
    setGenerating(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/ai/interview-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvData, jobDescription: jobDesc })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      
      setQuestions(result.data);
      setAnswers(Array(result.data.length).fill(''));
    } catch (e: any) {
      alert(e.message || 'Sorular üretilirken hata oluştu.');
    } finally {
      setGenerating(false);
    }
  };

  const handleEvaluateAnswers = async () => {
    if (answers.some(a => !a.trim())) return alert('Lütfen tüm sorulara cevap verin.');
    setEvaluating(true);
    try {
      const res = await fetch('/api/ai/interview-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions, answers, jobDescription: jobDesc })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      
      setFeedback(result.data);
    } catch (e: any) {
      alert(e.message || 'Değerlendirme yapılırken hata oluştu.');
    } finally {
      setEvaluating(false);
    }
  };

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center">Yükleniyor...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-slate-900 pb-6">
        <Link href={`/dashboard/cv/${slug}/edit`}>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-fuchsia-400" />
            AI Mülakat Simülatörü
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            <strong>{cvTitle}</strong> CV'niz üzerinden hedeflenen iş ilanına göre zorlu mülakat pratiği yapın.
          </p>
        </div>
      </div>

      {!questions.length ? (
        // Step 1: Input Job Description
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/40 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-white flex items-center gap-2">
              Hedeflenen İş İlanı <span className="text-xs text-slate-500 font-normal">(Kopyala / Yapıştır)</span>
            </label>
            <Textarea 
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Başvurmayı düşündüğünüz şirketin yayınladığı iş ilanının tam metnini buraya yapıştırın..."
              className="h-64 bg-slate-900/50 border-slate-800 focus:border-fuchsia-500/50"
            />
          </div>
          <div className="flex justify-end">
            <Button 
              onClick={handleGenerateQuestions} 
              disabled={generating}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-lg shadow-fuchsia-600/20"
            >
              {generating ? 'Sorular Hazırlanıyor...' : (
                <><Play className="w-4 h-4 mr-2" /> Mülakatı Başlat</>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Step 2: Answer Questions */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">İnsan Kaynakları Uzmanı Soruyor:</h2>
            {questions.map((q, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
                <div className="flex gap-3 text-slate-300">
                  <div className="w-8 h-8 rounded-full bg-fuchsia-600/20 text-fuchsia-400 flex items-center justify-center font-bold shrink-0">
                    İK
                  </div>
                  <div className="pt-1 font-medium">{q}</div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <Textarea 
                    value={answers[idx]}
                    onChange={(e) => {
                      const newAns = [...answers];
                      newAns[idx] = e.target.value;
                      setAnswers(newAns);
                    }}
                    placeholder="Yanıtınızı buraya yazın... (Örn: Bu durumda STAR metodunu kullanarak şunları yaptım...)"
                    className="min-h-[120px] bg-slate-950 border-slate-800 focus:border-indigo-500/50 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          {!feedback ? (
            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleEvaluateAnswers} 
                disabled={evaluating}
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 w-full md:w-auto"
              >
                {evaluating ? 'Cevaplar Değerlendiriliyor...' : (
                  <><Sparkles className="w-4 h-4 mr-2" /> Cevaplarımı Değerlendir</>
                )}
              </Button>
            </div>
          ) : (
            // Step 3: Feedback
            <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-4 animate-in slide-in-from-bottom-4">
              <h2 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Mülakat Geri Bildirimi
              </h2>
              <div className="prose prose-invert prose-emerald max-w-none text-sm leading-relaxed">
                <ReactMarkdown>{feedback}</ReactMarkdown>
              </div>
              <div className="pt-4 flex justify-end">
                <Button variant="outline" onClick={() => { setQuestions([]); setAnswers([]); setFeedback(null); }} className="border-slate-700">
                  Yeni Mülakat Başlat
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
