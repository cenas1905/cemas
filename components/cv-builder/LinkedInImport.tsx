'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LinkedInImportProps {
  onImportSuccess: (data: any) => void;
  isPro: boolean;
}

export default function LinkedInImport({ onImportSuccess, isPro }: LinkedInImportProps) {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusText, setStatusText] = useState('');

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkedinUrl.includes('linkedin.com/')) {
      setError('Lütfen geçerli bir LinkedIn URL adresi girin.');
      return;
    }

    setLoading(true);
    setError(null);
    setStatusText('Apify LinkedIn Scraper başlatılıyor...');

    try {
      const response = await fetch('/api/linkedin/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ linkedinUrl })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Profil çekilirken bir hata oluştu.');
      }

      setStatusText('LinkedIn profil verisi çözümleniyor...');
      const result = await response.json();
      onImportSuccess(result.data);
      setStatusText('Başarıyla aktarıldı!');
      setLinkedinUrl('');
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
          <span>🔗 LinkedIn'den Otomatik Import</span>
          {!isPro && (
            <span className="text-[10px] bg-indigo-950 text-indigo-300 font-bold px-2 py-0.5 rounded-full border border-indigo-900">
              1 Hak (Free)
            </span>
          )}
        </CardTitle>
        <CardDescription className="text-slate-400">
          LinkedIn profil URL'nizi girin. Yapay zeka ile tüm işlerinizi, eğitiminizi ve sertifikalarınızı saniyeler içinde çekelim.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleImport} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin-url" className="text-slate-200 text-sm">LinkedIn Profil Linki</Label>
            <div className="flex gap-2">
              <Input
                id="linkedin-url"
                type="url"
                placeholder="https://www.linkedin.com/in/kullaniciadi"
                required
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                disabled={loading}
                className="bg-slate-950/50 border-slate-800 text-white placeholder-slate-500 focus-visible:ring-indigo-500 focus-visible:ring-offset-0 focus-visible:border-indigo-500 flex-1"
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 font-medium"
              >
                {loading ? 'İçe Aktarılıyor...' : 'Profili Çek'}
              </Button>
            </div>
          </div>
          
          {loading && (
            <div className="flex items-center space-x-2 text-sm text-indigo-400 font-medium bg-slate-950/20 p-2.5 rounded-lg border border-slate-800">
              <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              <span>{statusText}</span>
            </div>
          )}

          {error && (
            <div className="p-3 text-sm text-red-400 bg-red-950/30 border border-red-900/50 rounded-lg">
              {error}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
