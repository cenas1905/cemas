'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, Download, FileText, Sparkles, Check } from 'lucide-react';

interface CoverLetterGeneratorProps {
  cvData: any;
  isPro: boolean;
}

export default function CoverLetterGenerator({ cvData, isPro }: CoverLetterGeneratorProps) {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPro) {
      setError('Ön Yazı Oluşturucu özelliği sadece PRO üyeler içindir.');
      return;
    }

    setLoading(true);
    setError(null);
    setCoverLetter(null);

    try {
      const response = await fetch('/api/ai/cover-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cvData, companyName, jobTitle, jobDescription })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Ön yazı üretilirken hata oluştu.');
      }

      const result = await response.json();
      setCoverLetter(result.coverLetter);
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!coverLetter) return;
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!coverLetter) return;
    const element = document.createElement('a');
    const file = new Blob([coverLetter], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${companyName.replace(/\s+/g, '_')}_On_Yazi.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>AI Ön Yazı (Cover Letter) Oluşturucu</span>
          </CardTitle>
          <CardDescription className="text-slate-400">
            Başvurmak istediğiniz şirkete ve pozisyona özel, CV'nizle tam uyumlu profesyonel ön yazılar tasarlayın.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-name" className="text-slate-200 text-sm">Şirket Adı</Label>
                <Input
                  id="company-name"
                  type="text"
                  placeholder="Örn: Teknoloji A.Ş., Lojistik Firması"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  disabled={loading}
                  className="bg-slate-950/50 border-slate-800 text-white placeholder-slate-500 focus-visible:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-title" className="text-slate-200 text-sm">Pozisyon</Label>
                <Input
                  id="job-title"
                  type="text"
                  placeholder="Örn: Frontend Developer, Ürün Yöneticisi"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  disabled={loading}
                  className="bg-slate-950/50 border-slate-800 text-white placeholder-slate-500 focus-visible:ring-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-desc" className="text-slate-200 text-sm">İş Tanımı / İlan Detayları (Opsiyonel)</Label>
              <Textarea
                id="job-desc"
                placeholder="İlan detaylarını buraya yapıştırırsanız, AI yazınızı ilandaki anahtar kelimelere göre tam olarak optimize eder..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                disabled={loading}
                className="bg-slate-950/50 border-slate-800 text-white placeholder-slate-500 focus-visible:ring-indigo-500 min-h-[100px]"
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
              {loading ? 'Kapak Yazısı Hazırlanıyor...' : 'Ön Yazı Oluştur'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {coverLetter && (
        <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-850">
            <CardTitle className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              Hazırlanan Ön Yazı Taslağı
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={handleCopy} className="text-slate-400 hover:text-white h-8 w-8 p-0">
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="ghost" onClick={handleDownload} className="text-slate-400 hover:text-white h-8 w-8 p-0">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <pre className="text-slate-200 font-sans text-sm whitespace-pre-wrap leading-relaxed">
              {coverLetter}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
