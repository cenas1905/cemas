import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import {
  PlusCircle, FileText, Eye, Edit, Share2,
  ArrowRight, Clock, Zap, AlertTriangle, CheckCircle2,
  TrendingUp, Download, Trash2, Calendar
} from 'lucide-react';
import DeleteCVButton from '@/components/dashboard/DeleteCVButton';

export const dynamic = 'force-dynamic';

interface DashboardPageProps {
  searchParams: Promise<{ upgraded?: string }>;
}

export default async function DashboardPage(props: DashboardPageProps) {
  const searchParams = await props.searchParams;
  const isUpgradedSuccess = searchParams.upgraded === 'true';

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
  const { data: cvs } = await supabase.from('cvs').select('*').eq('user_id', userId).order('created_at', { ascending: false });

  let chartData: any[] = [];
  if (cvs && cvs.length > 0) {
    const cvIds = cvs.map((cv: any) => cv.id);
    const { data: rawViews } = await supabaseAdmin.from('cv_views').select('created_at').in('cv_id', cvIds);
    
    if (rawViews) {
      // Son 7 günü hazırla
      const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return { 
          date: d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
          rawDate: d.toISOString().split('T')[0],
          views: 0 
        };
      });

      rawViews.forEach(v => {
        const viewDate = new Date(v.created_at).toISOString().split('T')[0];
        const day = days.find(d => d.rawDate === viewDate);
        if (day) day.views++;
      });
      
      chartData = days.map(d => ({ date: d.date, views: d.views }));
    }
  }

  const isPro = profile?.plan === 'pro' || profile?.plan === 'annual';
  const firstName = profile?.full_name?.split(' ')[0] || 'Kullanıcı';
  const totalViews = cvs?.reduce((sum, cv) => sum + (cv.view_count || 0), 0) || 0;
  const activeLinks = cvs?.filter(cv => cv.is_public && cv.slug)?.length || 0;

  return (
    <div className="space-y-10 max-w-6xl mx-auto py-4 font-sans text-slate-100 selection:bg-indigo-500 selection:text-white">
      
      {/* ─── UPGRADE SUCCESS ALERTS ─── */}
      {isUpgradedSuccess && (
        <div className="flex items-center gap-3.5 p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5.5 h-5.5 text-emerald-400 shrink-0" />
          <div>
            <span className="font-bold text-white text-sm">Planınız Yükseltildi!</span>
            <p className="text-slate-400 text-xs mt-0.5">CVio Pro özellikleri artık hesabınızda aktif. Sınırsız AI ve kalıcı paylaşımların tadını çıkarın.</p>
          </div>
        </div>
      )}

      {/* ─── WELCOME HEADER ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Merhaba, {firstName} 👋</h1>
          <p className="text-slate-500 text-sm mt-1">Özgeçmişlerinizi kolayca düzenleyin, paylaşın ve performanslarını analiz edin.</p>
        </div>
        <Link
          href="/dashboard/cv/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-sm font-bold shadow-lg shadow-white/5 transition-all hover:scale-[1.02] shrink-0"
        >
          <PlusCircle className="w-4.5 h-4.5" />
          Yeni Özgeçmiş Oluştur
        </Link>
      </div>

      {/* ─── QUICK STATS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Oluşturulan CV', value: cvs?.length || 0, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/15', icon: <FileText className="w-5 h-5" /> },
          { label: 'Görüntülenmeler', value: totalViews, color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/15', icon: <Eye className="w-5 h-5" /> },
          { label: 'Aktif Paylaşımlar', value: activeLinks, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/15', icon: <Share2 className="w-5 h-5" /> },
        ].map(stat => (
          <div key={stat.label} className="p-6 rounded-2xl border border-slate-900 bg-slate-950/40 backdrop-blur-md flex items-center justify-between hover:border-slate-800 transition-all">
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-black text-white">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} ${stat.bg} border`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ─── ANALYTICS CHART ─── */}
      <AnalyticsChart data={chartData} />

      {/* ─── PRO UPGRADE BANNER FOR FREE ACCOUNTS ─── */}
      {!isPro && (
        <div className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Hesabınızı Pro'ya Yükseltin ⚡</h3>
              <p className="text-slate-400 text-xs mt-0.5">14 günlük paylaşım sınırı olmadan kalıcı linkler oluşturun, AI Kariyer Koçunu sınırsız kullanın.</p>
            </div>
          </div>
          <Link
            href="/upgrade"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-450 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/10 hover:scale-[1.02] transition-all shrink-0 w-full sm:w-auto"
          >
            Pro Özellikleri Aç <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* ─── CV CARDS SECTION ─── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Özgeçmiş Belgeleriniz</h2>
          <span className="text-[11px] font-bold text-slate-600 bg-slate-900 px-3 py-1 rounded-full">{cvs?.length || 0} adet</span>
        </div>
        
        {(!cvs || cvs.length === 0) ? (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/20 backdrop-blur-md py-20 flex flex-col items-center justify-center text-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center text-indigo-400">
              <FileText className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Henüz Bir Özgeçmiş Yok</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">LinkedIn profilinizi içe aktararak veya manuel doldurarak ilk profesyonel CV'nizi saniyeler içinde hazırlayabilirsiniz.</p>
            </div>
            <Link href="/dashboard/cv/new" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-white/5">
              <PlusCircle className="w-4 h-4" /> İlk CV'mi Oluştur
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvs.map((cv) => {
              const hasExpired = cv.link_expires_at && new Date(cv.link_expires_at) < new Date();
              const isShared = cv.is_public && cv.slug;
              const daysLeft = cv.link_expires_at
                ? Math.max(0, Math.ceil((new Date(cv.link_expires_at).getTime() - Date.now()) / 86400000))
                : null;

              return (
                <div key={cv.id} className="group relative rounded-2xl border border-slate-900 bg-slate-950/35 backdrop-blur-md hover:border-slate-800 transition-all p-6 flex flex-col justify-between min-h-[260px] hover:shadow-xl hover:shadow-indigo-500/[0.02]">
                  
                  {/* Top: Header & Badges */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1 flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-white truncate group-hover:text-indigo-400 transition-colors">{cv.title}</h3>
                        <p className="text-[10px] text-slate-500 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-650" />
                          {new Date(cv.updated_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })} güncellendi
                        </p>
                      </div>
                      <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {cv.template}
                      </span>
                    </div>

                    {/* Sharing / Expiration Status Widget */}
                    {isShared ? (
                      hasExpired ? (
                        <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/5 border border-red-500/10 text-xs">
                          <span className="flex items-center gap-2 text-red-400 font-medium">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            Süresi doldu (14g)
                          </span>
                          <Link href="/upgrade" className="text-[10px] text-red-300 hover:text-red-200 font-black uppercase tracking-wider shrink-0">Uzat ⚡</Link>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="relative flex h-1.5 w-1.5 shrink-0">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            <Link href={`/cv/${cv.slug}`} target="_blank" className="text-emerald-400 font-mono hover:underline truncate text-[11px]">
                              /cv/{cv.slug}
                            </Link>
                          </div>
                          {daysLeft !== null && !isPro && (
                            <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded shrink-0 ml-2">{daysLeft} gün kaldı</span>
                          )}
                        </div>
                      )
                    ) : (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-900/60 text-xs">
                        <span className="text-slate-500">Bağlantı Pasif / Taslak</span>
                        <Link href={`/dashboard/cv/${cv.id}/preview`} className="text-[10px] text-slate-400 hover:text-white font-bold uppercase tracking-wider">Aktifleştir →</Link>
                      </div>
                    )}
                  </div>

                  {/* Middle: Stats */}
                  <div className="flex items-center gap-4 py-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span><strong className="text-slate-350">{cv.view_count || 0}</strong> izlenme</span>
                    </div>
                    {cv.target_company && (
                      <div className="flex items-center gap-1.5 text-violet-400/80">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[100px]">{cv.target_company}</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom: Main Quick Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-slate-900">
                    <Link 
                      href={`/dashboard/cv/${cv.id}/edit`} 
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" /> Düzenle
                    </Link>
                    <Link 
                      href={`/dashboard/cv/${cv.id}/preview`} 
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-xs font-bold text-indigo-400 transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" /> Paylaş
                    </Link>
                    <a
                      href={cv.pdf_url || `/api/cv/generate-pdf?cvId=${cv.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-9.5 h-9.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="PDF İndir"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DeleteCVButton id={cv.id} />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
