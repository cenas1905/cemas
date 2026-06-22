'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type CVTemplate = 'modern' | 'minimal' | 'creative';

interface TemplateSelectorProps {
  selected: CVTemplate;
  onChange: (template: CVTemplate) => void;
  isPro: boolean;
}

export default function TemplateSelector({ selected, onChange, isPro }: TemplateSelectorProps) {
  const templates = [
    {
      id: 'modern' as CVTemplate,
      name: 'Modern (Standart)',
      desc: 'Temiz, okunaklı ve güven veren standart mavi tema.',
      color: 'bg-indigo-600',
      isFree: true
    },
    {
      id: 'minimal' as CVTemplate,
      name: 'Minimalist (Big Tech)',
      desc: 'Dev şirketler için tamamen siyah-beyaz, yüksek kontrastlı ve elit tasarım.',
      color: 'bg-slate-900',
      isFree: false
    },
    {
      id: 'creative' as CVTemplate,
      name: 'Kreatif (Modern)',
      desc: 'Canlı mor ve eflatun vurgularıyla enerjisi yüksek, yaratıcı ve dikkat çekici.',
      color: 'bg-fuchsia-600',
      isFree: false
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">CV Şablonu Seçin</h3>
        {!isPro && (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-900">
            Pro Şablonlar Kilitli 🔒
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((tpl) => {
          const disabled = !tpl.isFree && !isPro;
          return (
            <Card
              key={tpl.id}
              onClick={() => {
                if (!disabled) onChange(tpl.id);
              }}
              className={cn(
                "border-slate-800 bg-slate-950/40 cursor-pointer transition-all duration-300 hover:border-indigo-500/50",
                selected === tpl.id && "ring-2 ring-indigo-500 border-transparent bg-slate-900/80",
                disabled && "opacity-60 cursor-not-allowed hover:border-slate-800"
              )}
            >
              <CardContent className="p-4 flex items-center space-x-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold shrink-0", tpl.color)}>
                  {tpl.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-semibold text-white truncate">{tpl.name}</p>
                    {!tpl.isFree && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                        Pro
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{tpl.desc}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
