'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase-client';
import LinkedInImport from '@/components/cv-builder/LinkedInImport';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePlus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewCVPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('plan')
          .eq('id', user.id)
          .single();
        setProfile(data);
      }
    }
    loadProfile();
  }, [supabase]);

  const isPro = profile?.plan === 'pro' || profile?.plan === 'annual';

  const handleStartFromScratch = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const defaultCV = {
      personal: {
        fullName: user.email?.split('@')[0] || 'Yeni Kullanıcı',
        headline: '',
        location: '',
        email: user.email || '',
        linkedin: '',
        summary: '',
        photo: ''
      },
      experience: [],
      education: [],
      skills: [],
      certifications: []
    };

    const { data, error } = await supabase
      .from('cvs')
      .insert({
        user_id: user.id,
        title: 'Yeni Özgeçmiş Taslağı',
        data: defaultCV,
        template: 'modern',
        is_public: false
      })
      .select()
      .single();

    if (error) {
      alert(`CV oluşturulurken hata: ${error.message}`);
      setLoading(false);
    } else {
      router.push(`/cv/${data.id}/edit`);
    }
  };

  const handleImportSuccess = async (importedData: any) => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('cvs')
      .insert({
        user_id: user.id,
        title: `${importedData.personal.fullName || 'LinkedIn'} CV Taslağı`,
        data: importedData,
        template: 'modern',
        is_public: false
      })
      .select()
      .single();

    if (error) {
      alert(`CV kaydedilirken hata: ${error.message}`);
      setLoading(false);
    } else {
      router.push(`/cv/${data.id}/edit`);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Go Back */}
      <div>
        <Link href="/dashboard" className="inline-flex items-center text-xs text-slate-400 hover:text-white transition font-medium gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          Panele Geri Dön
        </Link>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Özgeçmişinizi Oluşturun</h2>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          Yeni özgeçmişinize başlamak için aşağıdaki iki yöntemden birini seçebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Option A: LinkedIn Import */}
        <div className="flex flex-col h-full justify-between">
          <LinkedInImport onImportSuccess={handleImportSuccess} isPro={isPro} />
        </div>

        {/* Option B: Scratch Builder */}
        <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between h-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
              <FilePlus className="w-5 h-5 text-indigo-400" />
              Sıfırdan Manuel Başla
            </CardTitle>
            <CardDescription className="text-slate-400">
              Herhangi bir dış veri çekmeden, tüm bilgilerinizi kendiniz form üzerinden doldurarak özgeçmişinizi tasarlayın.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <Button
              onClick={handleStartFromScratch}
              disabled={loading}
              className="w-full bg-slate-850 hover:bg-slate-800 text-white border border-slate-700 font-semibold"
            >
              {loading ? 'Yükleniyor...' : 'Boş CV Oluştur'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
