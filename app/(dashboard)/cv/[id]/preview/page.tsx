'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase-client';
import Link from 'next/link';
import CVPreview from '@/components/cv-builder/CVPreview';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Download, Share2, Copy, Check, MessageSquare, Send, Sparkles, AlertTriangle } from 'lucide-react';

interface PreviewCVPageProps {
  params: Promise<{ id: string }>;
}

export default function PreviewCVPage({ params }: PreviewCVPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const supabase = createClientComponentClient();

  const [cv, setCv] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Link Sharing States
  const [targetCompany, setTargetCompany] = useState('');
  const [generatingLink, setGeneratingLink] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [linkExpires, setLinkExpires] = useState<string | null>(null);

  // AI Career Coach States
  const [coachOpen, setCoachOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'coach'; text: string }>>([
    { sender: 'coach', text: 'Merhaba! Ben sizin kişisel kariyer koçunuzum. Özgeçmişinizi inceledim. Mülakat hazırlığı, kariyer tavsiyeleri veya CV iyileştirmesi hakkında bana istediğinizi sorabilirsiniz!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch profile
      const { data: profData } = await supabase
        .from('profiles')
        .select('plan')
        .eq('id', user.id)
        .single();
      setProfile(profData);

      // Fetch CV
      const { data, error } = await supabase
        .from('cvs')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error || !data) {
        alert('Özgeçmiş bulunamadı.');
        router.push('/dashboard');
        return;
      }

      setCv(data);
      if (data.is_public && data.slug) {
        setShareLink(`${window.location.origin}/cv/${data.slug}`);
        setLinkExpires(data.link_expires_at);
      }
      setLoading(false);
    }
    loadData();
  }, [id, supabase, router]);

  const isPro = profile?.plan === 'pro' || profile?.plan === 'annual';

  // 1. Generate Sharing Link
  const handleGenerateLink = async () => {
    setGeneratingLink(true);
    try {
      const response = await fetch('/api/cv/generate-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cvId: id,
          targetCompany: targetCompany.trim() || undefined
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Paylaşım linki oluşturulamadı.');
      }

      const result = await response.json();
      setShareLink(result.link);
      setLinkExpires(result.expiresAt);
      
      // Update local CV state
      setCv((prev: any) => ({
        ...prev,
        is_public: true,
        slug: result.link.split('/').pop(),
        link_expires_at: result.expiresAt
      }));
    } catch (err: any) {
      alert(err.message || 'Bir hata oluştu.');
    } finally {
      setGeneratingLink(false);
    }
  };

  // 2. Copy Link to Clipboard
  const handleCopy = () => {
    if (!shareLink) return;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 3. Send message to AI Career Coach
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || sendingMessage) return;

    if (!isPro) {
      alert('Yapay zeka kariyer koçu sohbeti sadece PRO üyeler için geçerlidir.');
      return;
    }

    const userMsg = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setSendingMessage(true);

    try {
      const response = await fetch('/api/ai/career-coach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMsg,
          cvData: cv.data
        })
      });

      if (!response.ok) {
        throw new Error('Yanıt alınamadı.');
      }

      const result = await response.json();
      setMessages(prev => [...prev, { sender: 'coach', text: result.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'coach', text: 'Koç ile bağlantı kurulurken bir hata oluştu. Lütfen tekrar deneyin.' }]);
    } finally {
      setSendingMessage(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-slate-400">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <span>Özgeçmiş Hazırlanıyor...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-4">
        <div className="flex items-center space-x-3">
          <Link href={`/cv/${id}/edit`}>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h2 className="text-xl font-bold text-white">{cv.title} — Önizleme & Paylaşım</h2>
        </div>
        
        <Link href={`/api/cv/generate-pdf?cvId=${id}`} target="_blank">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold gap-2 shadow-lg shadow-indigo-600/20">
            <Download className="w-4 h-4" />
            PDF İndir
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Actions, Link generation & Coach */}
        <div className="lg:col-span-5 space-y-6">
          {/* Share Link Card */}
          <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-base font-bold text-white flex items-center gap-1.5">
                <Share2 className="w-4.5 h-4.5 text-indigo-400" />
                Paylaşım Linki Oluştur
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs">
                Özgeçmişinizi mülakat uzmanlarına ve işe alım yöneticilerine göndermek için benzersiz bir web bağlantısı üretin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {shareLink ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      readOnly
                      value={shareLink}
                      className="bg-slate-950/50 border-slate-800 text-indigo-300 font-mono text-xs select-all focus-visible:ring-0"
                    />
                    <Button onClick={handleCopy} size="icon" className="bg-indigo-600 hover:bg-indigo-700 shrink-0 h-9 w-9">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  {linkExpires ? (
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-white">Geçici Link Aktif</p>
                        <p className="mt-0.5 text-slate-400">
                          Bu link <strong>7 gün sonra ({new Date(linkExpires).toLocaleDateString('tr-TR')})</strong> pasif hale gelerek ziyaretçileri üyelik yükseltme sayfasına yönlendirecektir. Linki kalıcı yapmak için Pro plana geçin.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                      ✨ Bu link **kalıcıdır** ve süresi asla dolmaz (PRO Plan).
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-300 font-medium">Hedef Şirket (Özel slug için isteğe bağlı)</label>
                    <Input
                      placeholder="Örn: Google (ali-google linkini oluşturur)"
                      value={targetCompany}
                      onChange={(e) => setTargetCompany(e.target.value)}
                      className="bg-slate-950/50 border-slate-800 text-white text-xs"
                    />
                  </div>
                  <Button
                    onClick={handleGenerateLink}
                    disabled={generatingLink}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 font-semibold text-xs py-2"
                  >
                    {generatingLink ? 'Link Oluşturuluyor...' : 'Bağlantı Linkini Oluştur'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Career Coach Card */}
          <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-white flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-4.5 h-4.5 text-purple-400" />
                  AI Kariyer Koçu
                </span>
                {!isPro && (
                  <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/35 px-2 py-0.5 rounded-full uppercase font-black shrink-0">
                    Pro Özellik 🔒
                  </span>
                )}
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs">
                Özgeçmişinize özel kariyer hedefleri belirleyin, mülakat simülasyonları yapın ve tavsiyeler alın.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 border-t border-slate-900">
              {isPro ? (
                <div className="flex flex-col h-[350px]">
                  {/* Chat logs */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl max-w-[85%] ${
                          msg.sender === 'user'
                            ? 'bg-indigo-600 text-white ml-auto'
                            : 'bg-slate-950/80 border border-slate-850 text-slate-300'
                        }`}
                      >
                        <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                      </div>
                    ))}
                    {sendingMessage && (
                      <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-850 text-slate-400 w-fit flex items-center space-x-1.5">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    )}
                  </div>
                  {/* Input field */}
                  <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-900 flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Sorunuzu buraya yazın..."
                      disabled={sendingMessage}
                      className="bg-slate-950/50 border-slate-800 text-white text-xs h-8 flex-1 focus-visible:ring-indigo-500"
                    />
                    <Button type="submit" disabled={sendingMessage || !inputMessage.trim()} size="icon" className="h-8 w-8 bg-indigo-600 hover:bg-indigo-700 text-white">
                      <Send className="w-3.5 h-3.5" />
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="p-6 text-center space-y-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-300 mx-auto">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">Kariyer Koçunu Etkinleştirin</h5>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                      Özgeçmişinizden yola çıkarak size özel mülakat tavsiyeleri veren yapay zeka koçuyla görüşmek için Pro'ya yükseltin.
                    </p>
                  </div>
                  <Link href="/upgrade">
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs mt-2">
                      Aylık $9.99'a Abone Ol
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Render CV preview */}
        <div className="lg:col-span-7 bg-slate-950/20 p-4 sm:p-6 rounded-2xl border border-slate-900 overflow-y-auto max-h-[85vh] sticky top-24">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-4">Önizleme Tuvali (A4 Düzeni)</p>
          <CVPreview data={cv.data} template={cv.template} />
        </div>
      </div>
    </div>
  );
}
