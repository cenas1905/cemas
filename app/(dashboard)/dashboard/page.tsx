import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { Button } from '@/components/ui/button';
import {
  PlusCircle, FileText, Eye, Edit, Share2, TrendingUp,
  Sparkles, ArrowRight, Clock, Zap, AlertTriangle
} from 'lucide-react';
import DeleteCVButton from '@/components/dashboard/DeleteCVButton';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user.id;

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
  const { data: cvs } = await supabase.from('cvs').select('*').eq('user_id', userId).order('created_at', { ascending: false });

  const isPro = profile?.plan === 'pro' || profile?.plan === 'annual';
  const firstName = profile?.full_name?.split(' ')[0] || 'Kullanıcı';
  const totalViews = cvs?.reduce((sum, cv) => sum + (cv.view_count || 0), 0) || 0;
  const activeLinks = cvs?.filter(cv => cv.is_public && cv.slug)?.length || 0;

  const timeOfDay = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Günaydın';
    if (h < 18) return 'İyi öğleden sonralar';
    return 'İyi akşamlar';
  };

  return (
    <div className="space-y-8">

      {/* ── Welcome Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <p className="text-slate-500 text-sm font-medium mb-1">{timeOfDay()},</p>
          <h1 className="text-3xl font-black text-white tracking-tight">
            {firstName} 👋
          </h1>
          <p className="text-slate-400 text-sm mt-1.5 max-w-md">
            CV'lerinizi yönetin, AI kariyer koçu ile tavsiyeler alın ve yeni fırsatlar için optimize edin.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/cv/new">
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold shadow-xl shadow-indigo-500/20 gap-2 transition-all hover:scale-[1.02]">
              <PlusCircle className="w-4 h-4" />
              Yeni CV Oluştur
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Toplam CV', value: cvs?.length || 0, icon: <FileText className="w-5 h-5" />, color: 'indigo' },
          { label: 'Toplam Görüntülenme', value: totalViews, icon: <Eye className="w-5 h-5" />, color: 'violet' },
          { label: 'Aktif Link', value: activeLinks, icon: <Share2 className="w-5 h-5" />, color: 'emerald' },
          { label: 'Plan', value: isPro ? 'Pro' : 'Ücretsiz', icon: <Sparkles className="w-5 h-5" />, color: isPro ? 'amber' : 'slate' },
        ].map((stat) => (
          <div key={stat.label} className={`p-5 rounded-2xl border transition-all ${
            stat.color === 'indigo' ? 'bg-indigo-500/5 border-indigo-500/15' :
            stat.color === 'violet' ? 'bg-violet-500/5 border-violet-500/15' :
            stat.color === 'emerald' ? 'bg-emerald-500/5 border-emerald-500/15' :
            stat.color === 'amber' ? 'bg-amber-500/5 border-amber-500/15' :
            'bg-white/3 border-white/8'
          }`}>
            <div className={`mb-3 ${
              stat.color === 'indigo' ? 'text-indigo-400' :
              stat.color === 'violet' ? 'text-violet-400' :
              stat.color === 'emerald' ? 'text-emerald-400' :
              stat.color === 'amber' ? 'text-amber-400' : 'text-slate-400'
            }`}>{stat.icon}</div>
            <div className="text-2xl font-black text-white">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── Pro upgrade banner ── */}
      {!isPro && (
        <div className="relative rounded-2xl overflow-hidden border border-amber-500/20">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5" />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Pro'ya yükseltin — Linkiniz asla sona ermesin</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Şu anda paylaşım linkleriniz 7 gün sonra otomatik devre dışı kalıyor. Pro ile kalıcı link, tüm şablonlar ve AI kariyer koçu.
                </p>
              </div>
            </div>
            <Link href="/upgrade" className="shrink-0">
              <Button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20 gap-2 whitespace-nowrap">
                <Sparkles className="w-4 h-4" />
                Pro'ya Yükselt
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* ── CV Grid ── */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">CV'lerim</h2>
          {cvs && cvs.length > 0 && (
            <span className="text-xs text-slate-500">{cvs.length} özgeçmiş</span>
          )}
        </div>

        {(!cvs || cvs.length === 0) ? (
          /* Empty state */
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/2 py-20 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center">
              <FileText className="w-8 h-8 text-slate-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Henüz CV Yok</h3>
              <p className="text-slate-500 text-sm max-w-sm">
                Hemen yeni bir CV oluşturarak dakikalar içinde profesyonel bir tasarım elde edin.
              </p>
            </div>
            <Link href="/cv/new">
              <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold mt-2 gap-2">
                <PlusCircle className="w-4 h-4" />
                İlk CV'mi Oluştur
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {cvs.map((cv) => {
              const hasExpired = cv.link_expires_at && new Date(cv.link_expires_at) < new Date();
              const isShared = cv.is_public && cv.slug;
              const daysLeft = cv.link_expires_at
                ? Math.max(0, Math.ceil((new Date(cv.link_expires_at).getTime() - Date.now()) / 86400000))
                : null;

              return (
                <div key={cv.id} className="group relative rounded-2xl border border-white/8 bg-gradient-to-b from-white/4 to-transparent p-6 flex flex-col gap-5 hover:border-white/14 transition-all duration-300">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-white truncate">{cv.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {new Date(cv.updated_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-slate-400">
                      {cv.template}
                    </span>
                  </div>

                  {/* Link status */}
                  <div className="space-y-2">
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Paylaşım Linki</p>
                    {isShared ? (
                      hasExpired ? (
                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-500/8 border border-red-500/15">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          <span className="text-xs text-red-400 font-medium">Süresi doldu</span>
                          <Link href="/upgrade" className="ml-auto text-[10px] text-red-400 underline">Yenile</Link>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/8 border border-emerald-500/15">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                          <div className="flex-1 min-w-0">
                            <Link href={`/cv/${cv.slug}`} target="_blank" className="text-xs text-emerald-300 font-mono hover:text-emerald-200 truncate block">
                              /cv/{cv.slug}
                            </Link>
                          </div>
                          {daysLeft !== null && !isPro && (
                            <span className="text-[10px] text-amber-400 shrink-0">{daysLeft}g kaldı</span>
                          )}
                        </div>
                      )
                    ) : (
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/3 border border-white/6">
                        <div className="w-2 h-2 rounded-full bg-slate-600 shrink-0" />
                        <span className="text-xs text-slate-500">Link oluşturulmadı</span>
                        <Link href={`/cv/${cv.id}/preview`} className="ml-auto text-[10px] text-indigo-400 hover:text-indigo-300">Oluştur →</Link>
                      </div>
                    )}
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-4 text-slate-500 text-xs">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-indigo-400" />
                      <strong className="text-white">{cv.view_count || 0}</strong> görüntülenme
                    </span>
                    {cv.target_company && (
                      <span className="flex items-center gap-1.5 text-violet-400">
                        🎯 {cv.target_company}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1 border-t border-white/5">
                    <Link href={`/cv/${cv.id}/edit`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full border-white/8 text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/15 text-xs font-semibold gap-1.5">
                        <Edit className="w-3.5 h-3.5" /> Düzenle
                      </Button>
                    </Link>
                    <Link href={`/cv/${cv.id}/preview`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/8 hover:border-indigo-500/30 text-xs font-semibold gap-1.5">
                        <Share2 className="w-3.5 h-3.5" /> Paylaş
                      </Button>
                    </Link>
                    <DeleteCVButton id={cv.id} />
                  </div>
                </div>
              );
            })}

            {/* Add new CV card */}
            <Link href="/cv/new">
              <div className="rounded-2xl border border-dashed border-white/8 hover:border-indigo-500/30 bg-transparent hover:bg-indigo-500/4 p-6 flex flex-col items-center justify-center gap-3 text-center h-full cursor-pointer transition-all duration-300 min-h-[220px] group">
                <div className="w-12 h-12 rounded-xl border border-dashed border-white/10 group-hover:border-indigo-500/30 flex items-center justify-center transition-colors">
                  <PlusCircle className="w-6 h-6 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 group-hover:text-slate-300 transition-colors">Yeni CV Ekle</p>
                  <p className="text-xs text-slate-600 mt-0.5">Şablon seçin ve başlayın</p>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* ── Quick tips for Pro users ── */}
      {isPro && cvs && cvs.length > 0 && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-500/8 to-purple-500/8 border border-indigo-500/15 flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-white mb-0.5">Pro İpucu</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Şirkete özel CV linkleri oluşturmak için CV düzenle → Önizle → Hedef Şirket belirle. 
              Örn: <span className="text-indigo-400 font-mono">/cv/adiniz-sirket</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
