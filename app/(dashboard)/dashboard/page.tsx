import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, FileText, Eye, Edit, Trash2, ArrowRight, Share2 } from 'lucide-react';
import DeleteCVButton from '@/components/dashboard/DeleteCVButton';
import SpotlightCard from '@/components/animations/SpotlightCard';

export default async function DashboardPage() {
  const supabase = await createClient();

  // 1. Fetch current user session
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user.id;

  // 2. Fetch Profile and CV list
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  const { data: cvs } = await supabase
    .from('cvs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  const isPro = profile?.plan === 'pro' || profile?.plan === 'annual';

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Hoş geldin, {profile?.full_name?.split(' ')[0] || 'Kullanıcı'} 👋
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Özgeçmişlerinizi yönetin, AI kariyer koçu ile tavsiyeler alın veya yeni bir CV oluşturun.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/cv/new">
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium shadow-lg shadow-indigo-500/20 gap-2">
              <PlusCircle className="w-4 h-4" />
              Yeni CV Oluştur
            </Button>
          </Link>
        </div>
      </div>

      {/* CV Limit Warning for Free users */}
      {!isPro && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300 font-bold shrink-0">
              ⚡
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Free Hesap Kullanıyorsunuz</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Oluşturduğunuz CV'lerin paylaşım linkleri ve indirdiğiniz PDF'ler 7 gün sonra otomatik olarak silinir. Sınırsız kullanım için Pro'ya geçin.
              </p>
            </div>
          </div>
          <Link href="/upgrade">
            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shrink-0">
              Şimdi Yükselt
            </Button>
          </Link>
        </div>
      )}

      {/* CV Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-200">CV'lerim</h3>
        
        {cvs && cvs.length === 0 ? (
          <Card className="border-slate-800 bg-slate-950/20 border-dashed py-12 text-center">
            <CardHeader className="flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                <FileText className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg text-slate-300">Özgeçmiş Bulunmuyor</CardTitle>
              <CardDescription className="text-slate-500 max-w-sm">
                Henüz bir özgeçmiş oluşturmadınız. LinkedIn profilinizden çekerek ya da sıfırdan manuel olarak hemen başlayın.
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
              <Link href="/cv/new">
                <Button variant="outline" className="border-indigo-600/30 text-indigo-400 hover:bg-indigo-950/20">
                  İlk CV'mi Oluşturayım <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvs?.map((cv) => {
              const hasExpired = cv.link_expires_at && new Date(cv.link_expires_at) < new Date();
              const isShared = cv.is_public && cv.slug;

              return (
                <SpotlightCard key={cv.id} className="border-slate-800 bg-slate-900/10 flex flex-col justify-between p-6">
                  <div>
                    {/* Header Part */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h4 className="text-base font-bold text-white truncate max-w-[70%]">{cv.title}</h4>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-950 px-2 py-0.5 rounded border border-slate-850">
                        {cv.template}
                      </span>
                    </div>
                    
                    <p className="text-[10px] text-slate-500 mb-4">
                      Son Güncelleme: {new Date(cv.updated_at).toLocaleDateString('tr-TR')}
                    </p>

                    {/* Share Link Info */}
                    <div className="space-y-1.5 mb-4">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Paylaşım Linki</p>
                      {isShared ? (
                        hasExpired ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-950/30 text-red-400 border border-red-900/50">
                            Süresi Doldu (Geçici)
                          </span>
                        ) : (
                          <div className="flex flex-col gap-1">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950/30 text-emerald-400 border border-emerald-900/50 w-fit">
                              Aktif
                            </span>
                            <Link
                              href={`/cv/${cv.slug}`}
                              target="_blank"
                              className="text-xs text-indigo-400 hover:text-indigo-300 truncate underline underline-offset-4 mt-1"
                            >
                              /cv/{cv.slug}
                            </Link>
                          </div>
                        )
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-500 border border-slate-850">
                          Paylaşılmadı
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-slate-400 text-xs mb-6">
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-4 h-4 text-indigo-400" />
                        <strong>{cv.view_count || 0}</strong> Görüntülenme
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-slate-900 pt-4 flex gap-2 w-full mt-auto">
                    <Link href={`/cv/${cv.id}/edit`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full text-xs font-semibold border-slate-800 text-slate-300 hover:text-white hover:bg-slate-950">
                        <Edit className="w-3.5 h-3.5 mr-1" />
                        Düzenle
                      </Button>
                    </Link>
                    <Link href={`/cv/${cv.id}/preview`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full text-xs font-semibold border-slate-800 text-slate-300 hover:text-white hover:bg-slate-950">
                        <Share2 className="w-3.5 h-3.5 mr-1" />
                        Paylaş
                      </Button>
                    </Link>
                    <DeleteCVButton id={cv.id} />
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

