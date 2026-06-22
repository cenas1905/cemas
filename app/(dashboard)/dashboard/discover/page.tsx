'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search, Briefcase, Users, Sparkles, AlertTriangle, CheckCircle2,
  TrendingUp, Wand2, ExternalLink, Lock, Loader2, Compass, AlertCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DiscoverPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  // General States
  const [activeTab, setActiveTab] = useState<'jobs' | 'peer'>('jobs');
  const [profile, setProfile] = useState<any>(null);
  const [cvs, setCvs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Job Search States
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('Turkey');
  const [jobs, setJobs] = useState<any[]>([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsError, setJobsError] = useState('');

  // CV Optimization Modal States
  const [optimizeModalOpen, setOptimizeModalOpen] = useState(false);
  const [selectedCvId, setSelectedCvId] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [optimizing, setOptimizing] = useState(false);

  // Peer Comparison States
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [peerSearchTitle, setPeerSearchTitle] = useState('');
  const [peerSearchSkills, setPeerSearchSkills] = useState('');
  const [compareLoading, setCompareLoading] = useState(false);
  const [compareError, setCompareError] = useState('');
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  const [competitorProfile, setCompetitorProfile] = useState<any>(null);

  // Load User Data
  useEffect(() => {
    async function loadData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/login');
          return;
        }

        // Fetch User Profile
        const { data: prof } = await supabase
          .from('profiles')
          .select('plan')
          .eq('id', user.id)
          .single();
        setProfile(prof);

        // Fetch User CVs
        const { data: userCvs } = await supabase
          .from('cvs')
          .select('id, title, data, template')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });
        
        setCvs(userCvs || []);
        if (userCvs && userCvs.length > 0) {
          setSelectedCvId(userCvs[0].id);
        }
      } catch (err) {
        console.error('Data loading error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [supabase, router]);

  const isPro = profile?.plan === 'pro' || profile?.plan === 'annual';

  // 1. Search LinkedIn Jobs
  const handleJobSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywords.trim()) return;

    setJobsLoading(true);
    setJobsError('');
    setJobs([]);

    try {
      const res = await fetch(`/api/linkedin/search-jobs?keywords=${encodeURIComponent(keywords.trim())}&location=${encodeURIComponent(location.trim())}`);
      
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'İş ilanları aranamadı.');
      }

      const { data } = await res.json();
      setJobs(data || []);
    } catch (err: any) {
      setJobsError(err.message || 'Apify servisinden veriler çekilirken bir sorun oluştu.');
    } finally {
      setJobsLoading(false);
    }
  };

  // Open Optimization Modal
  const openOptimizeModal = (companyName: string) => {
    setTargetCompany(companyName || '');
    setOptimizeModalOpen(true);
  };

  // 2. Perform CV Optimization
  const handleOptimizeCV = async () => {
    if (!selectedCvId) {
      alert('Lütfen optimize etmek istediğiniz CV\'yi seçin.');
      return;
    }

    setOptimizing(true);
    try {
      const selectedCv = cvs.find(c => c.id === selectedCvId);
      if (!selectedCv) throw new Error('Seçilen CV bulunamadı.');

      const res = await fetch('/api/ai/improve-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvData: selectedCv.data,
          targetCompany: targetCompany.trim() || undefined
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Optimizasyon başarısız oldu.');
      }

      const result = await res.json();

      // Create a new customized CV copy
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const newTitle = `${selectedCv.title} (${targetCompany || 'İş İlanı'} Uyumlu)`;
      
      const { data: newCv, error: insertError } = await supabase
        .from('cvs')
        .insert({
          user_id: user.id,
          title: newTitle,
          data: result.data,
          template: selectedCv.template || 'modern',
          target_company: targetCompany.trim() || null,
          is_public: false
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Close modal and redirect user to edit the new CV
      setOptimizeModalOpen(false);
      router.push(`/dashboard/cv/${newCv.id}/edit`);
    } catch (err: any) {
      alert(err.message || 'CV optimize edilirken bir hata oluştu.');
    } finally {
      setOptimizing(false);
    }
  };

  // 3. Search Competitor Profile on Google Helper
  const handleBuildGoogleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!peerSearchTitle.trim()) return;
    
    const queryParts = [
      'site:linkedin.com/in/',
      `"${peerSearchTitle.trim()}"`
    ];
    
    if (peerSearchSkills.trim()) {
      peerSearchSkills.split(',').forEach(skill => {
        queryParts.push(`"${skill.trim()}"`);
      });
    }

    const searchQuery = queryParts.join(' ');
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
  };

  // 4. Compare Peer LinkedIn Profile
  const handleCompareProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPro) return; // Guard
    if (!competitorUrl.trim() || !selectedCvId) return;

    setCompareLoading(true);
    setCompareError('');
    setComparisonResult(null);
    setCompetitorProfile(null);

    try {
      const selectedCv = cvs.find(c => c.id === selectedCvId);
      if (!selectedCv) throw new Error('Lütfen kıyaslama için bir CV seçin.');

      const res = await fetch('/api/linkedin/compare-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvData: selectedCv.data,
          competitorUrl: competitorUrl.trim()
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Profil kıyaslama başarısız oldu.');
      }

      const { analysis, competitorProfile: compProf } = await res.json();
      setComparisonResult(analysis);
      setCompetitorProfile(compProf);
    } catch (err: any) {
      setCompareError(err.message || 'Scraper çalışırken veya AI rapor üretirken bir hata oluştu.');
    } finally {
      setCompareLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
        <span>Yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Compass className="w-8 h-8 text-indigo-500" />
            LinkedIn Keşfet <span className="text-sm font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">Kariyer Radarı</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1.5 max-w-xl">
            LinkedIn üzerindeki açık iş ilanlarını tarayın ve CV'nizi doğrudan ilan şartlarına göre optimize edin. Veya sektördeki akranlarınızın profillerini analiz edip gelişim fırsatlarını yakalayın.
          </p>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-white/10 gap-6">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`pb-4 text-sm font-bold tracking-tight transition-all flex items-center gap-2 relative ${
            activeTab === 'jobs' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          LinkedIn İş Fırsatları
          {activeTab === 'jobs' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />}
        </button>
        <button
          onClick={() => setActiveTab('peer')}
          className={`pb-4 text-sm font-bold tracking-tight transition-all flex items-center gap-2 relative ${
            activeTab === 'peer' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Users className="w-4 h-4" />
          Akran Kıyaslama (LinkedIn Radar)
          {activeTab === 'peer' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />}
        </button>
      </div>

      {/* Tab 1: LinkedIn Job Search */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
            <form onSubmit={handleJobSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aranacak Pozisyon / Yetenek</label>
                <div className="relative">
                  <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Örn: React Developer, Product Manager"
                    className="pl-10 bg-slate-900 border-white/10 text-white rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 h-11"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Konum</label>
                <div className="relative">
                  <Compass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Örn: Turkey, Istanbul, Remote"
                    className="pl-10 bg-slate-900 border-white/10 text-white rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 h-11"
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={jobsLoading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-indigo-600/15 gap-2"
              >
                {jobsLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Apify Taranıyor...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    İlanları Bul
                  </>
                )}
              </Button>
            </form>
            <p className="text-[11px] text-slate-500 mt-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              Bu arama LinkedIn'deki en son canlı ilanları programatik olarak listeler. Cookies/Hesap gerektirmez.
            </p>
          </div>

          {jobsError && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 flex gap-3 text-sm text-red-400 items-start">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              <div>
                <p className="font-bold">Arama hatası</p>
                <p className="text-xs text-red-400/80 mt-1">{jobsError}</p>
              </div>
            </div>
          )}

          {jobsLoading && (
            <div className="rounded-2xl border border-white/8 bg-white/2 py-24 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
              <h3 className="text-lg font-bold text-white mb-1">LinkedIn Taranıyor</h3>
              <p className="text-slate-400 text-sm max-w-sm">
                Apify Scraper arka planda LinkedIn API'lerini tetikliyor. Bu işlem 15-45 saniye sürebilir, lütfen sayfayı kapatmayın.
              </p>
            </div>
          )}

          {!jobsLoading && jobs.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Bulunan İlanlar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.map((job, idx) => (
                  <div key={idx} className="rounded-xl border border-white/8 bg-gradient-to-b from-white/4 to-transparent p-5 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-white text-base leading-tight">{job.title || 'İş İlanı'}</h4>
                        {job.jobUrl && (
                          <a href={job.jobUrl} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white shrink-0">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-indigo-400 font-semibold">{job.companyName || 'Şirket Belirtilmemiş'}</p>
                      <p className="text-xs text-slate-400">{job.location || 'Konum Belirtilmemiş'} • {job.postedAt || 'Yeni İlan'}</p>
                      {job.description && (
                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mt-2">
                          {job.description}
                        </p>
                      )}
                    </div>
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">LinkedIn Jobs</span>
                      <Button
                        onClick={() => openOptimizeModal(job.companyName)}
                        size="sm"
                        className="bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white text-xs font-semibold gap-1.5 rounded-lg"
                      >
                        <Wand2 className="w-3.5 h-3.5" />
                        CV'mi Optimize Et
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!jobsLoading && jobs.length === 0 && !jobsError && (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/2 py-20 flex flex-col items-center justify-center text-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-slate-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">LinkedIn Arama Sonucu</h3>
                <p className="text-slate-500 text-sm max-w-xs mt-1">
                  Yukarıdaki formu kullanarak LinkedIn iş ilanlarını arayın.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Peer Comparison */}
      {activeTab === 'peer' && (
        <div className="space-y-8">
          {/* Paywall Overlay if user is not Pro */}
          {!isPro ? (
            <div className="rounded-2xl border border-amber-500/20 bg-[#0c0f17]/80 backdrop-blur-md p-8 relative overflow-hidden flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Lock className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-extrabold text-white">LinkedIn Profil Kıyaslama (Premium)</h2>
                <p className="text-slate-400 text-sm max-w-md">
                  Rakiplerinizin veya hedeflediğiniz sektördeki kişilerin LinkedIn profillerini sistemimize aktarın. Claude Yapay Zekası, onların CV yapısını sizin özgeçmişinizle kıyaslayarak aradaki boşlukları ve eksik kaldığınız yetenekleri detaylıca listelesin.
                </p>
              </div>
              <div className="flex gap-4">
                <Button onClick={() => router.push('/upgrade')} className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black px-6 shadow-xl shadow-amber-500/15">
                  Pro Üyeliğe Yükselt
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Controls Column */}
              <div className="lg:col-span-5 space-y-6">
                {/* Search helper */}
                <div className="rounded-2xl border border-white/8 bg-white/3 p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Search className="w-4 h-4 text-indigo-400" />
                    1. LinkedIn'de Akran Bulucu
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Kıyaslamak istediğiniz bir profesyonelin tam LinkedIn URL'sini bilmiyorsanız, Google üzerinden LinkedIn'deki hedeflenmiş kişileri kolayca bulmak için bu aracı kullanabilirsiniz.
                  </p>
                  <form onSubmit={handleBuildGoogleSearch} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hedef Unvan (Job Title)</label>
                      <Input
                        value={peerSearchTitle}
                        onChange={(e) => setPeerSearchTitle(e.target.value)}
                        placeholder="Örn: Senior React Developer"
                        className="bg-slate-900 border-white/10 text-white rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Teknolojiler / Filtreler (Virgülle ayırın)</label>
                      <Input
                        value={peerSearchSkills}
                        onChange={(e) => setPeerSearchSkills(e.target.value)}
                        placeholder="Örn: Next.js, Turkey, Stripe"
                        className="bg-slate-900 border-white/10 text-white rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full border-white/8 text-slate-300 hover:text-white hover:bg-white/5 font-semibold text-xs gap-1.5"
                    >
                      Profil Google Aramasını Aç
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </form>
                </div>

                {/* Analysis Form */}
                <div className="rounded-2xl border border-white/8 bg-white/3 p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-indigo-400" />
                    2. Kıyaslama Raporu Oluştur
                  </h3>
                  <form onSubmit={handleCompareProfile} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">LinkedIn Profil URL</label>
                      <Input
                        value={competitorUrl}
                        onChange={(e) => setCompetitorUrl(e.target.value)}
                        placeholder="Örn: https://www.linkedin.com/in/ad-soyad/"
                        className="bg-slate-900 border-white/10 text-white rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kendi CV'niz</label>
                      {cvs.length === 0 ? (
                        <p className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl p-2 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          Henüz hiç CV'niz bulunmuyor. Önce CV oluşturun.
                        </p>
                      ) : (
                        <select
                          value={selectedCvId}
                          onChange={(e) => setSelectedCvId(e.target.value)}
                          className="bg-slate-900 border border-white/10 text-white rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:border-indigo-500 h-10"
                        >
                          {cvs.map(c => (
                            <option key={c.id} value={c.id}>{c.title}</option>
                          ))}
                        </select>
                      )}
                    </div>
                    <Button
                      type="submit"
                      disabled={compareLoading || cvs.length === 0}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-indigo-600/15 gap-2"
                    >
                      {compareLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Akran Analizi Yapılıyor...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4" />
                          Kıyaslamayı Başlat
                        </>
                      )}
                    </Button>
                  </form>
                  {compareError && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-xs text-red-400 flex gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{compareError}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Display Column */}
              <div className="lg:col-span-7 space-y-6">
                {compareLoading && (
                  <div className="rounded-2xl border border-white/8 bg-white/2 py-32 flex flex-col items-center justify-center text-center">
                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
                    <h3 className="text-lg font-bold text-white mb-1">LinkedIn Scraper Başlatıldı</h3>
                    <p className="text-slate-400 text-sm max-w-sm mt-1 px-4 leading-relaxed">
                      LinkedIn profil verileri `automation-lab` robotuyla kazınıyor. Ardından Claude yapay zekası fark analizini çıkaracak. Bu işlem yaklaşık 30-60 saniye sürmektedir.
                    </p>
                  </div>
                )}

                {!compareLoading && comparisonResult && (
                  <div className="space-y-6">
                    {/* Header Score Info */}
                    <div className="rounded-2xl border border-white/8 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 p-6 flex flex-col sm:flex-row items-center gap-6">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="transparent" />
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="#6366f1"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={251.2}
                            strokeDashoffset={251.2 - (251.2 * comparisonResult.score) / 100}
                            strokeLinecap="round"
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <span className="absolute text-2xl font-black text-white">{comparisonResult.score}%</span>
                      </div>
                      <div className="space-y-1 text-center sm:text-left flex-1">
                        <h4 className="font-extrabold text-white text-lg">Benzerlik & Rekabet Skoru</h4>
                        <p className="text-xs text-slate-400">
                          Profil {competitorProfile?.personal?.fullName ? `(${competitorProfile.personal.fullName})` : ''} ile sizin CV'nizin yetkinlik, tecrübe ve yapısal benzerlik yüzdesi.
                        </p>
                        {competitorProfile?.personal?.headline && (
                          <p className="text-xs text-indigo-400 italic font-medium mt-1 leading-normal">
                            "{competitorProfile.personal.headline}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Gap analysis */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Strengths */}
                      <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/2 p-5 space-y-3">
                        <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          Güçlü Yanlarınız (Üstünlükler)
                        </h4>
                        <ul className="space-y-2">
                          {comparisonResult.strengths?.map((str: string, i: number) => (
                            <li key={i} className="text-xs text-slate-300 leading-normal flex items-start gap-1.5">
                              <span className="text-emerald-400 font-bold mt-0.5">•</span>
                              <span>{str}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Gaps */}
                      <div className="rounded-2xl border border-red-500/10 bg-red-500/2 p-5 space-y-3">
                        <h4 className="text-sm font-bold text-red-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" />
                          Eksikler ve Boşluklar (Gaps)
                        </h4>
                        <ul className="space-y-2">
                          {comparisonResult.gaps?.map((gap: string, i: number) => (
                            <li key={i} className="text-xs text-slate-300 leading-normal flex items-start gap-1.5">
                              <span className="text-red-400 font-bold mt-0.5">•</span>
                              <span>{gap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Suggestions */}
                    <div className="rounded-2xl border border-white/8 bg-white/3 p-6 space-y-4">
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-indigo-400" />
                        Aksiyon Alınabilir CV Önerileri
                      </h4>
                      <div className="space-y-3">
                        {comparisonResult.suggestions?.map((sug: string, i: number) => (
                          <div key={i} className="p-3 rounded-xl bg-slate-900/50 border border-white/4 text-xs text-slate-300 leading-relaxed">
                            <span className="font-bold text-indigo-400 block mb-1">Öneri #{i + 1}</span>
                            {sug}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {!compareLoading && !comparisonResult && (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-white/2 py-28 flex flex-col items-center justify-center text-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center text-slate-500">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Karşılaştırma Raporu</h3>
                      <p className="text-slate-500 text-sm max-w-xs mt-1">
                        Soldaki formdan bir profil URL'si verip analiz başlattığınızda Claude Raporu burada görüntülenecektir.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* CV Optimization dialog */}
      <Dialog open={optimizeModalOpen} onOpenChange={setOptimizeModalOpen}>
        <DialogContent className="bg-[#0b0f17] border border-white/10 text-white rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-white flex items-center gap-2">
              <Wand2 className="text-indigo-400 w-5 h-5 animate-pulse" />
              CV Optimizasyon Sihirbazı
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs">
              Seçtiğiniz CV'deki alanları (Deneyim, Özet, Yetenekler), hedef şirketin kriterlerine göre Claude 3.5 Sonnet ile ATS uyumlu olacak şekilde yeniden yazar. Orijinal CV'niz korunur ve kopyası oluşturulur.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Optimize Edilecek CV</label>
              <select
                value={selectedCvId}
                onChange={(e) => setSelectedCvId(e.target.value)}
                disabled={optimizing}
                className="bg-slate-900 border border-white/10 text-white rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:border-indigo-500 h-10"
              >
                {cvs.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hedef Şirket Adı</label>
              <Input
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                placeholder="Örn: Google, Garanti BBVA"
                disabled={optimizing}
                className="bg-slate-900 border-white/10 text-white rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              onClick={() => setOptimizeModalOpen(false)}
              variant="outline"
              disabled={optimizing}
              className="border-white/8 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-semibold"
            >
              İptal
            </Button>
            <Button
              onClick={handleOptimizeCV}
              disabled={optimizing}
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/10 gap-2"
            >
              {optimizing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Yapay Zeka Hazırlıyor...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Kopya Oluştur ve Optimize Et
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
