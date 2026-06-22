import React from 'react';
import { Briefcase, Rocket, Sparkles, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function JobsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
      
      {/* Icon Container */}
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-indigo-500 blur-[60px] opacity-20 rounded-full w-32 h-32 m-auto animate-pulse" />
        <div className="relative w-24 h-24 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center justify-center shadow-xl shadow-black/50 backdrop-blur-sm m-auto">
          <Briefcase className="w-10 h-10 text-indigo-400" />
          <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded-full shadow-lg border border-emerald-400">
            Yakında
          </div>
        </div>
      </div>

      {/* Text Content */}
      <h1 className="text-4xl font-black text-white tracking-tight">
        Yapay Zeka Destekli <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">İş Bulma</span>
      </h1>
      
      <p className="text-slate-400 text-base max-w-lg leading-relaxed">
        CV'nize ve yeteneklerinize %100 uyan, yapay zeka tarafından taranmış en iyi iş ilanları çok yakında burada listelenecek. 
        Tek tıkla eşleşme oranınızı görebilecek ve anında başvurabileceksiniz.
      </p>

      {/* Feature List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full max-w-2xl text-left">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/30 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-white">Sana Özel İlanlar</h3>
            <p className="text-xs text-slate-500 mt-1">CV'nizdeki yetkinlikleri analiz edip sadece sizin kazanabileceğiniz ilanları getireceğiz.</p>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/30 flex items-start gap-3">
          <Rocket className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-white">Tek Tıkla Başvuru</h3>
            <p className="text-xs text-slate-500 mt-1">Hazırladığınız CV ve ön yazı ile firmalara saniyeler içinde başvurabileceksiniz.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="pt-8">
        <Button className="bg-white text-black hover:bg-slate-200 shadow-lg shadow-white/10 font-bold px-8 py-6 rounded-xl flex items-center gap-2">
          <BellRing className="w-5 h-5" />
          Açıldığında Bana Haber Ver
        </Button>
      </div>

      <div className="pt-4">
        <Link href="/dashboard" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
          &larr; Kontrol Paneline Dön
        </Link>
      </div>
    </div>
  );
}
