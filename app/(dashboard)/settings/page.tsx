import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, CreditCard, Mail, User } from 'lucide-react';

export default async function SettingsPage() {
  const supabase = await createClient();

  // Get current user session
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user.id;

  // Fetch profile details
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  const isPro = profile?.plan === 'pro' || profile?.plan === 'annual';

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-white">Hesap Ayarları</h2>
        <p className="text-slate-400 text-sm mt-1">
          Kişisel bilgilerinizi ve faturalandırma detaylarınızı görüntüleyin.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Profile Details Card */}
        <Card className="border-slate-800 bg-slate-900/40">
          <CardHeader>
            <CardTitle className="text-base text-white">Profil Bilgileri</CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Hesabınızla ilişkilendirilmiş temel profil bilgileri.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 text-slate-300 text-sm">
              <User className="w-4 h-4 text-indigo-400" />
              <span><strong>Ad Soyad:</strong> {profile?.full_name || 'Girilmedi'}</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-300 text-sm">
              <Mail className="w-4 h-4 text-indigo-400" />
              <span><strong>E-posta:</strong> {profile?.email || 'Girilmedi'}</span>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Billing Details */}
        <Card className="border-slate-800 bg-slate-900/40">
          <CardHeader>
            <CardTitle className="text-base text-white flex items-center justify-between">
              <span>Abonelik & Plan Durumu</span>
              {isPro ? (
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  <Award className="w-3 h-3 fill-amber-300" />
                  PRO
                </span>
              ) : (
                <span className="text-[10px] bg-slate-950 text-slate-500 font-bold px-2 py-0.5 rounded-full border border-slate-850">
                  FREE
                </span>
              )}
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Mevcut aboneliğiniz ve yenileme tarihleriniz.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isPro ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-300 text-sm">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>
                    <strong>Aktif Plan:</strong> {profile.plan === 'annual' ? 'Yıllık Pro Plan' : 'Aylık Pro Plan'}
                  </span>
                </div>
                {profile.plan_expires_at && (
                  <p className="text-xs text-slate-400 pl-7">
                    Yenilenme / Bitiş Tarihi: <strong>{new Date(profile.plan_expires_at).toLocaleDateString('tr-TR')}</strong>
                  </p>
                )}
                <div className="p-3 bg-emerald-950/20 border border-emerald-900/30 text-emerald-400 text-xs rounded-lg">
                  Tebrikler! Sınırsız PDF indirme, kalıcı link paylaşımı ve AI kariyer koçu özellikleriniz aktif durumda.
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-slate-300 text-sm">
                  Şu anda **Ücretsiz (Free)** planı kullanıyorsunuz.
                </p>
                <div className="p-3 bg-slate-950/30 border border-slate-850 text-slate-400 text-xs rounded-lg space-y-1">
                  <p className="font-semibold text-white">Free Plan Limitleri:</p>
                  <p>• PDF indirmeleri 7 gün sonra sunucudan silinir.</p>
                  <p>• Paylaşım linkleri 7 gün sonra pasifleşerek abonelik yükseltme sayfasına yönlenir.</p>
                  <p>• AI kariyer koçu sohbeti ve pro şablonlar kullanılamaz.</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t border-slate-900 pt-4">
            {isPro ? (
              <Button variant="outline" className="border-slate-800 text-slate-400 hover:text-white hover:bg-slate-950 text-xs font-semibold">
                Faturalandırmayı Yönet (Stripe Portal)
              </Button>
            ) : (
              <Link href="/upgrade">
                <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs">
                  Aylık ₺199 ile Pro'ya Yükselt
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
