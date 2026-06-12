import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { Award, CreditCard, Mail, User, Zap, Shield, LogOut, AlertTriangle } from 'lucide-react';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user.id;

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
  const isPro = profile?.plan === 'pro' || profile?.plan === 'annual';

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white">Hesap Ayarları</h1>
        <p className="text-slate-400 text-sm mt-1">Profil bilgilerinizi ve aboneliğinizi yönetin.</p>
      </div>

      {/* ── Profile Card ── */}
      <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'linear-gradient(180deg,rgba(13,18,32,0.9) 0%,rgba(9,13,26,0.9) 100%)' }}>
        <div className="px-7 py-5 border-b border-white/6 flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400" /> Profil Bilgileri
          </h2>
        </div>
        <div className="p-7 space-y-5">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              {(profile?.full_name?.[0] || 'U').toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-bold text-white">{profile?.full_name || 'İsim belirtilmedi'}</p>
              <p className="text-sm text-slate-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> {session?.user.email || '-'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-xs text-slate-500 mb-1">Ad Soyad</p>
              <p className="text-sm font-semibold text-white">{profile?.full_name || 'Belirtilmedi'}</p>
            </div>
            <div className="p-4 rounded-xl border border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-xs text-slate-500 mb-1">E-posta</p>
              <p className="text-sm font-semibold text-white">{session?.user.email || 'Belirtilmedi'}</p>
            </div>
            <div className="p-4 rounded-xl border border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-xs text-slate-500 mb-1">Kayıt Tarihi</p>
              <p className="text-sm font-semibold text-white">
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
              </p>
            </div>
            <div className="p-4 rounded-xl border border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-xs text-slate-500 mb-1">Giriş Yöntemi</p>
              <p className="text-sm font-semibold text-white">
                {session?.user.app_metadata?.provider === 'google' ? '🟢 Google' : '📧 E-posta & Şifre'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Subscription Card ── */}
      <div className="rounded-2xl border overflow-hidden" style={{
        borderColor: isPro ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.08)',
        background: isPro
          ? 'linear-gradient(180deg,rgba(245,158,11,0.05) 0%,rgba(9,13,26,0.9) 100%)'
          : 'linear-gradient(180deg,rgba(13,18,32,0.9) 0%,rgba(9,13,26,0.9) 100%)'
      }}>
        <div className="px-7 py-5 border-b border-white/6 flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-indigo-400" /> Abonelik & Plan
          </h2>
          {isPro ? (
            <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border"
              style={{ background: 'rgba(245,158,11,0.12)', borderColor: 'rgba(245,158,11,0.3)', color: '#fbbf24' }}>
              <Award className="w-3.5 h-3.5" style={{ fill: '#fbbf24' }} /> PRO
            </span>
          ) : (
            <span className="text-xs font-bold px-3 py-1 rounded-full border border-white/10 text-slate-500" style={{ background: 'rgba(255,255,255,0.03)' }}>
              ÜCRETSİZ
            </span>
          )}
        </div>

        <div className="p-7 space-y-5">
          {isPro ? (
            <>
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="text-sm font-bold text-white">
                    {profile.plan === 'annual' ? 'Yıllık Pro Plan' : 'Aylık Pro Plan'}
                  </p>
                  {profile.plan_expires_at && (
                    <p className="text-xs text-slate-400">
                      Yenilenme: {new Date(profile.plan_expires_at).toLocaleDateString('tr-TR')}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/20" style={{ background: 'rgba(16,185,129,0.06)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-300">Aktif Özellikler</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                  {['Sınırsız PDF', 'Kalıcı link', 'AI kariyer koçu', 'Tüm şablonlar', 'Sınırsız import', 'Analitik'].map(f => (
                    <span key={f} className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> {f}
                    </span>
                  ))}
                </div>
              </div>

              <button className="px-5 py-2.5 rounded-xl border border-white/10 text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                Faturalandırmayı Yönet
              </button>
            </>
          ) : (
            <>
              <div className="p-4 rounded-xl border border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <p className="text-sm font-bold text-white mb-2">Ücretsiz Plan Limitleri</p>
                <div className="space-y-1.5 text-xs text-slate-400">
                  <p>• PDF indirmeleri 7 gün sonra silinir</p>
                  <p>• Paylaşım linkleri 7 gün sonra pasifleşir</p>
                  <p>• AI kariyer koçu ve premium şablonlar kapalı</p>
                  <p>• LinkedIn import hakkı: 1 adet</p>
                </div>
              </div>

              <Link href="/upgrade">
                <button className="w-full py-3.5 rounded-xl font-bold text-sm text-slate-950 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)', boxShadow: '0 4px 20px rgba(245,158,11,0.3)' }}>
                  <Zap className="w-4 h-4" /> Pro'ya Yükselt — ₺199/ay
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ── Danger Zone ── */}
      <div className="rounded-2xl border border-red-500/15 overflow-hidden" style={{ background: 'rgba(239,68,68,0.03)' }}>
        <div className="px-7 py-5 border-b border-red-500/10 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <h2 className="text-base font-bold text-red-400">Tehlikeli Bölge</h2>
        </div>
        <div className="p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-white font-semibold">Çıkış Yap</p>
            <p className="text-xs text-slate-400 mt-0.5">Bu cihazdan güvenli şekilde çıkış yapın.</p>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="px-5 py-2.5 rounded-xl border border-red-500/20 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Çıkış Yap
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
