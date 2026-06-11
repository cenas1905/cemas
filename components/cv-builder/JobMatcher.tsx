'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle2, AlertTriangle, Lightbulb, Sparkles } from 'lucide-react';

interface JobMatcherProps {
  cvData: any;
  isPro: boolean;
}

export default function JobMatcher({ cvData, isPro }: JobMatcherProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPro) {
      setError('İş İlanı Eşleştirme özelliği sadece PRO üyeler içindir.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/ai/job-match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cvData, jobDescription })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Analiz yapılırken hata oluştu.');
      }

      const data = await response.json();
      setResult(data.analysis);
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>AI İş İlanı Eşleştirme (Job Matching)</span>
          </CardTitle>
          <CardDescription className="text-slate-400">
            Hedeflediğiniz iş ilanının metnini yapıştırın; özgeçmişinizle olan uyumluluğunu, eksiklerinizi ve iyileştirme tavsiyelerini anında raporlayalım.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="job-desc-matcher" className="text-slate-200 text-sm">İş Tanımı Metni</Label>
              <Textarea
                id="job-desc-matcher"
                placeholder="İş tanımını, sorumlulukları ve aranan nitelikleri buraya yapıştırın..."
                required
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                disabled={loading}
                className="bg-slate-950/50 border-slate-800 text-white placeholder-slate-500 focus-visible:ring-indigo-500 min-h-[150px] leading-relaxed"
              />
            </div>

            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-950/30 border border-red-900/50 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium shadow-lg"
            >
              {loading ? 'Analiz Ediliyor...' : 'Eşleşmeyi Analiz Et'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Radial score card */}
          <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center lg:col-span-1">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-wider">Eşleşme Puanı</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex flex-col items-center justify-center">
              {/* Circular progress bar SVG */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    className="stroke-slate-800"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    className="stroke-indigo-500 transition-all duration-1000"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 60}
                    strokeDashoffset={2 * Math.PI * 60 * (1 - result.score / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-3xl font-black text-white">{result.score}%</span>
              </div>
              <p className="text-xs text-slate-400 mt-4 leading-relaxed max-w-[200px]">
                {result.score >= 80 
                  ? 'Harika bir uyum! Bu ilana özgeçmişinizle doğrudan başvurabilirsiniz.'
                  : result.score >= 60 
                  ? 'Güçlü bir uyum, ancak CV\'nizi optimize ederek şansınızı artırabilirsiniz.'
                  : 'Düşük uyum. CV\'nizi ilana göre güncellemeniz oldukça kritik.'}
              </p>
            </CardContent>
          </Card>

          {/* Analysis details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Strengths */}
            <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4.5 h-4.5" />
                  Güçlü Yanlarınız
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-350 space-y-2">
                {result.strengths?.map((str: string, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">•</span>
                    <p>{str}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Gaps */}
            <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4.5 h-4.5" />
                  CV'nizde Eksik Kalanlar
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-350 space-y-2">
                {result.gaps?.map((gap: string, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-amber-500 font-bold shrink-0">•</span>
                    <p>{gap}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Suggestions */}
            <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                  <Lightbulb className="w-4.5 h-4.5" />
                  CV Optimizasyon Önerileri
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-350 space-y-2">
                {result.suggestions?.map((sug: string, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-indigo-500 font-bold shrink-0">•</span>
                    <p>{sug}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
