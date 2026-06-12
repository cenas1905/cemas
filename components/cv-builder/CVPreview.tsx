'use client';

import React from 'react';
import { CVTemplate } from './TemplateSelector';

interface CVPreviewProps {
  data: any;
  template: CVTemplate;
}

export default function CVPreview({ data, template }: CVPreviewProps) {
  const {
    personal = {},
    experience = [],
    education = [],
    skills = [],
    certifications = [],
  } = data;

  // Render different styling wrapper based on templates
  const getTemplateStyles = () => {
    switch (template) {
      case 'minimal':
        return {
          container: 'font-mono text-slate-800 p-8 bg-white border border-slate-200 shadow-xl max-w-[21cm] min-h-[29.7cm] mx-auto text-xs leading-relaxed',
          header: 'border-b border-slate-300 pb-4 mb-6',
          name: 'text-2xl font-bold uppercase tracking-tight text-slate-900',
          headline: 'text-xs text-slate-500 font-medium tracking-wide mt-1 uppercase',
          contactInfo: 'flex flex-wrap gap-x-4 gap-y-1 mt-2 text-slate-500 text-[10px]',
          sectionTitle: 'font-bold text-slate-900 border-b border-slate-200 pb-1 mb-3 uppercase tracking-wider',
          company: 'font-bold text-slate-800',
          date: 'text-slate-500 font-medium text-[10px]',
          badge: 'px-2 py-0.5 border border-slate-300 rounded text-[10px] text-slate-700 font-mono bg-slate-50'
        };
      case 'professional':
        return {
          container: 'font-sans text-slate-800 p-10 bg-white border border-slate-200 shadow-xl max-w-[21cm] min-h-[29.7cm] mx-auto text-sm leading-relaxed',
          header: 'border-l-4 border-emerald-600 pl-4 mb-6',
          name: 'text-2xl font-extrabold text-slate-900 tracking-tight',
          headline: 'text-sm text-emerald-600 font-semibold mt-1',
          contactInfo: 'flex flex-wrap gap-x-4 gap-y-1 mt-2 text-slate-500 text-xs',
          sectionTitle: 'font-extrabold text-slate-900 border-b-2 border-emerald-600/20 pb-1 mb-3 text-xs uppercase tracking-wider',
          company: 'font-semibold text-emerald-700',
          date: 'text-slate-500 font-medium text-xs',
          badge: 'px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-100'
        };
      case 'warm':
        return {
          container: 'font-serif text-slate-800 p-10 bg-white border border-slate-200 shadow-xl max-w-[21cm] min-h-[29.7cm] mx-auto text-sm leading-relaxed',
          header: 'text-center border-b border-amber-300 pb-6 mb-6',
          name: 'text-3xl font-normal text-slate-900 tracking-wide serif',
          headline: 'text-sm text-amber-700 italic mt-1',
          contactInfo: 'flex justify-center flex-wrap gap-x-4 gap-y-1 mt-3 text-slate-500 text-xs',
          sectionTitle: 'font-normal text-amber-800 border-b border-amber-200 pb-1 mb-3 text-sm tracking-wider uppercase',
          company: 'font-medium text-slate-900 italic',
          date: 'text-amber-700 italic text-xs',
          badge: 'px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 text-xs font-medium border border-amber-200'
        };
      case 'modern':
      default:
        return {
          container: 'font-sans text-slate-700 p-10 bg-white border border-slate-100 shadow-xl max-w-[21cm] min-h-[29.7cm] mx-auto text-sm leading-relaxed',
          header: 'border-b-2 border-indigo-500 pb-5 mb-6',
          name: 'text-3xl font-black text-slate-900 tracking-tight',
          headline: 'text-base text-indigo-600 font-bold tracking-wide mt-1',
          contactInfo: 'flex flex-wrap gap-x-4 gap-y-1 mt-3 text-slate-500 text-xs font-medium',
          sectionTitle: 'font-black text-slate-900 border-b border-slate-200 pb-1.5 mb-4 text-xs uppercase tracking-wider',
          company: 'font-semibold text-slate-800',
          date: 'text-slate-400 font-medium text-xs',
          badge: 'px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100'
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.name}>{personal.fullName || 'Ad Soyad'}</h1>
        {personal.headline && <p className={styles.headline}>{personal.headline}</p>}
        <div className={styles.contactInfo}>
          {personal.email && (
            <span className="flex items-center gap-1">
              <span>✉</span> {personal.email}
            </span>
          )}
          {personal.location && (
            <span className="flex items-center gap-1">
              <span>📍</span> {personal.location}
            </span>
          )}
          {personal.linkedin && (
            <span className="flex items-center gap-1">
              <span>🔗</span> {personal.linkedin}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="mb-6">
          <h2 className={styles.sectionTitle}>Özet</h2>
          <p className="text-slate-600 text-justify text-xs whitespace-pre-line">{personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className={styles.sectionTitle}>Deneyim</h2>
          <div className="space-y-4">
            {experience.map((exp: any, idx: number) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-slate-900">{exp.title}</span>
                    <span className="text-slate-400 mx-1.5">|</span>
                    <span className={styles.company}>{exp.company}</span>
                  </div>
                  <span className={styles.date}>
                    {exp.startDate} - {exp.current ? 'Günümüz' : exp.endDate}
                  </span>
                </div>
                {exp.location && <p className="text-slate-400 text-xs">{exp.location}</p>}
                {exp.description && (
                  <p className="text-slate-600 text-xs text-justify whitespace-pre-line mt-1">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className={styles.sectionTitle}>Eğitim</h2>
          <div className="space-y-3">
            {education.map((edu: any, idx: number) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-slate-900">{edu.school}</span>
                    {edu.degree && (
                      <>
                        <span className="text-slate-400 mx-1.5">|</span>
                        <span className="font-medium text-slate-700">
                          {edu.degree}{edu.field ? ` (${edu.field})` : ''}
                        </span>
                      </>
                    )}
                  </div>
                  <span className={styles.date}>
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="mb-6">
          <h2 className={styles.sectionTitle}>Sertifikalar</h2>
          <div className="space-y-3">
            {certifications.map((cert: any, idx: number) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-slate-900">{cert.name}</span>
                    {cert.issuer && (
                      <>
                        <span className="text-slate-400 mx-1.5">|</span>
                        <span className="font-medium text-slate-700">{cert.issuer}</span>
                      </>
                    )}
                  </div>
                  {cert.date && <span className={styles.date}>{cert.date}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div>
          <h2 className={styles.sectionTitle}>Yetenekler</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill: string, idx: number) => (
              <span key={idx} className={styles.badge}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
