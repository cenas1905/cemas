'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase-client';
import Link from 'next/link';
import CVPreview from '@/components/cv-builder/CVPreview';
import CoverLetterGenerator from '@/components/cv-builder/CoverLetterGenerator';
import JobMatcher from '@/components/cv-builder/JobMatcher';
import { ArrowLeft, Download, Share2, Copy, Check, Send, Sparkles, AlertTriangle, Brain, FileText, Target, Link2 } from 'lucide-react';

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

  const [targetCompany, setTargetCompany] = useState('');
  const [generatingLink, setGeneratingLink] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [linkExpires, setLinkExpires] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'coach' | 'cover' | 'job'>('coach');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'coach'; text: string }>>([
    { sender: 'coach', text: 'Merhaba! Ben sizin kişisel kariyer koçunuzum. Özgeçmişinizi inceledim. Mülakat hazırlığı, kariyer tavsiyeleri veya CV iyileştirmesi hakkında bana istediğinizi sorabilirsiniz!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: prof } = await supabase.from('profiles').select('plan').eq('id', user.id).single();
      setProfile(prof);
      const { data, error } = await supabase.from('cvs').select('*').eq('id', id).eq('user_id', user.id).single();
      if (error || !data) { router.push('/dashboard'); return; }
      setCv(data);
      if (data.is_public && data.slug) {
        setShareLink(`${window.location.origin}/cv/${data.slug}`);
        setLinkExpires(data.link_expires_at);
      }
      setLoading(false);
    }
    load();
  }, [id, supabase, router]);

  const isPro = profile?.plan === 'pro' || profile?.plan === 'annual';

  const handleGenerateLink = async () => {
    setGeneratingLink(true);
    try {
      const res = await fetch('/api/cv/generate-link', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvId: id, targetCompany: targetCompany.trim() || undefined })
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error); }
      const result = await res.json();
      setShareLink(result.link);
      setLinkExpires(result.expiresAt);
      setCv((p: any) => ({ ...p, is_public: true, slug: result.link.split('/').pop(), link_expires_at: result.expiresAt }));
    } catch (err: any) { alert(err.message); }
    finally { setGeneratingLink(false); }
  };

  const handleCopy = () => {
    if (!shareLink) return;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || sendingMessage) return;
    if (!isPro) { alert('AI kariyer koçu sadece Pro üyeler için.'); return; }
    const userMsg = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setSendingMessage(true);
    try {
      const res = await fetch('/api/ai/career-coach', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, cvData: cv.data })
      });
      if (!res.ok) throw new Error('Yanıt alınamadı');
      const result = await res.json();
      setMessages(prev => [...prev, { sender: 'coach', text: result.reply }]);
    } catch { setMessages(prev => [...prev, { sender: 'coach', text: 'Bağlantı hatası. Tekrar deneyin.' }]); }
    finally { setSendingMessage(false); }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-3 rounded-full animate-spin mb-4"
          style={{ borderColor: 'rgba(99,102,241,0.2)', borderTopColor: '#6366f1' }} />
        <p className="text-slate-500 text-sm">Hazırlanıyor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Top bar ── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-5 border-b border-white/6">
        <div className="flex items-center gap-3">
          <Link href={`/cv/${id}/edit`}>
            <button className="w-9 h-9 rounded-xl border border-white/8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
          <h1 className="text-xl font-black text-white">{cv.title}</h1>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full border"
            style={{ background: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.2)', color: '#a5b4fc' }}>
            Önizleme & Paylaşım
          </span>
        </div>

        <Link href={`/api/cv/generate-pdf?cvId=${id}`} target="_blank">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 16px rgba(99,102,241,0.25)' }}>
            <Download className="w-4 h-4" /> PDF İndir
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── Left — Actions ── */}
        <div className="lg:col-span-5 space-y-5">

          {/* Share Link Card */}
          <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'linear-gradient(180deg,rgba(13,18,32,0.9),rgba(9,13,26,0.9))' }}>
            <div className="px-6 py-4 border-b border-white/6 flex items-center gap-2">
              <Link2 className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">Paylaşım Linki</h3>
            </div>
            <div className="p-6 space-y-4">
              {shareLink ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input readOnly value={shareLink}
                      className="flex-1 px-3 py-2.5 rounded-xl border border-white/8 bg-white/4 text-indigo-300 font-mono text-xs outline-none" />
                    <button onClick={handleCopy}
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all"
                      style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                      {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                    </button>
                  </div>
                  {linkExpires ? (
                    <div className="flex items-start gap-2.5 p-3.5 rounded-xl border"
                      style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.2)' }}>
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <p className="text-white font-semibold">Geçici Link — 7 gün</p>
                        <p className="text-slate-400 mt-0.5">
                          Son geçerlilik: <strong className="text-amber-300">{new Date(linkExpires).toLocaleDateString('tr-TR')}</strong>
                        </p>
                        <Link href="/upgrade" className="text-amber-400 underline underline-offset-2 mt-1 inline-block">Kalıcı yap →</Link>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-3 rounded-xl border"
                      style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.2)' }}>
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs text-emerald-300 font-semibold">Kalıcı link — süresi asla dolmaz (Pro)</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300 mb-1.5 block">Hedef Şirket (isteğe bağlı)</label>
                    <input value={targetCompany} onChange={e => setTargetCompany(e.target.value)}
                      placeholder="Google → /cv/adiniz-google"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/8 bg-white/4 text-white placeholder-slate-600 text-sm outline-none focus:border-indigo-500/50 transition-all" />
                  </div>
                  <button onClick={handleGenerateLink} disabled={generatingLink}
                    className="w-full py-3 rounded-xl font-bold text-sm text-white disabled:opacity-50 transition-all hover:scale-[1.01]"
                    style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 16px rgba(99,102,241,0.25)' }}>
                    {generatingLink ? 'Oluşturuluyor...' : 'Link Oluştur'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── AI Tools Tabs ── */}
          <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'linear-gradient(180deg,rgba(13,18,32,0.9),rgba(9,13,26,0.9))' }}>
            {/* Tab headers */}
            <div className="flex border-b border-white/6">
              {([
                { key: 'coach' as const, label: 'AI Koç', icon: <Brain className="w-3.5 h-3.5" /> },
                { key: 'cover' as const, label: 'Ön Yazı', icon: <FileText className="w-3.5 h-3.5" /> },
                { key: 'job' as const, label: 'İş Eşleştir', icon: <Target className="w-3.5 h-3.5" /> },
              ]).map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-xs font-semibold transition-all border-b-2 ${
                    activeTab === tab.key
                      ? 'text-indigo-300 border-indigo-500'
                      : 'text-slate-500 border-transparent hover:text-slate-300'
                  }`}>
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div>
              {activeTab === 'coach' && (
                isPro ? (
                  <div className="flex flex-col" style={{ height: '380px' }}>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
                      {messages.map((msg, i) => (
                        <div key={i} className={`p-3 rounded-xl max-w-[85%] leading-relaxed whitespace-pre-line ${
                          msg.sender === 'user'
                            ? 'ml-auto text-white' : 'text-slate-300 border border-white/6'
                        }`} style={msg.sender === 'user'
                          ? { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }
                          : { background: 'rgba(255,255,255,0.02)' }}>
                          {msg.text}
                        </div>
                      ))}
                      {sendingMessage && (
                        <div className="p-3 rounded-xl border border-white/6 w-fit flex gap-1.5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                          {[0, 150, 300].map(d => (
                            <div key={d} className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                          ))}
                        </div>
                      )}
                    </div>
                    <form onSubmit={handleSendMessage} className="p-3 border-t border-white/6 flex gap-2">
                      <input value={inputMessage} onChange={e => setInputMessage(e.target.value)} disabled={sendingMessage}
                        placeholder="Sorunuzu yazın..."
                        className="flex-1 px-3 py-2 rounded-xl border border-white/8 bg-white/4 text-white placeholder-slate-600 text-xs outline-none focus:border-indigo-500/50 transition-all" />
                      <button type="submit" disabled={sendingMessage || !inputMessage.trim()}
                        className="w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-40"
                        style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                        <Send className="w-3.5 h-3.5 text-white" />
                      </button>
                    </form>
                  </div>
                ) : (
                  <ProLockedState title="AI Kariyer Koçu" desc="CV'nize özel mülakat hazırlığı ve kariyer tavsiyeleri için Pro'ya geçin." />
                )
              )}

              {activeTab === 'cover' && (
                isPro ? <div className="p-5"><CoverLetterGenerator cvData={cv.data} isPro={isPro} /></div>
                : <ProLockedState title="AI Ön Yazı Oluşturucu" desc="Şirkete özel kapak mektubu oluşturmak için Pro'ya geçin." />
              )}

              {activeTab === 'job' && (
                isPro ? <div className="p-5"><JobMatcher cvData={cv.data} isPro={isPro} /></div>
                : <ProLockedState title="İş İlanı Eşleştirme" desc="CV-ilan uyumluluk analizi için Pro'ya geçin." />
              )}
            </div>
          </div>
        </div>

        {/* ── Right — Preview ── */}
        <div className="lg:col-span-7 sticky top-24">
          <div className="rounded-2xl border border-white/6 overflow-hidden" style={{ background: 'rgba(13,18,32,0.6)' }}>
            <div className="px-5 py-3 border-b border-white/6 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Önizleme (A4)</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[78vh]">
              <CVPreview data={cv.data} template={cv.template} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Pro Locked State component ── */
function ProLockedState({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-8 text-center space-y-4">
      <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center"
        style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
        <Sparkles className="w-5 h-5 text-amber-400" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">{desc}</p>
      </div>
      <Link href="/upgrade">
        <button className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 mt-2 transition-all hover:scale-[1.02]"
          style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)', boxShadow: '0 4px 16px rgba(245,158,11,0.3)' }}>
          Pro'ya Yükselt — ₺199/ay
        </button>
      </Link>
    </div>
  );
}
