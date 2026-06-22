'use client';

import React from 'react';
import { CVTemplate } from './TemplateSelector';

interface CVPreviewProps {
  data: any;
  template: CVTemplate;
}

export default function CVPreview({ data, template }: CVPreviewProps) {
  const personal = data?.personal || {};
  const experience = Array.isArray(data?.experience) ? data.experience : [];
  const education = Array.isArray(data?.education) ? data.education : [];
  const skills = Array.isArray(data?.skills) ? data.skills : [];
  const certifications = Array.isArray(data?.certifications) ? data.certifications : [];

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
      case 'creative':
        return {
          container: 'font-sans text-slate-800 p-10 bg-fuchsia-50/30 border border-fuchsia-200 shadow-xl max-w-[21cm] min-h-[29.7cm] mx-auto text-sm leading-relaxed',
          header: 'bg-fuchsia-100 p-6 rounded-xl mb-6',
          name: 'text-3xl font-extrabold text-fuchsia-600 tracking-tight',
          headline: 'text-sm text-purple-700 font-bold mt-1',
          contactInfo: 'flex flex-wrap gap-x-4 gap-y-1 mt-3 text-purple-600 text-xs font-semibold',
          sectionTitle: 'font-extrabold text-fuchsia-600 border-l-4 border-fuchsia-500 pl-2 mb-3 text-xs uppercase tracking-wider',
          company: 'font-bold text-purple-700',
          date: 'text-purple-400 font-bold text-xs',
          badge: 'px-3 py-1 rounded-full bg-fuchsia-100 text-fuchsia-700 text-xs font-extrabold border border-fuchsia-200'
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

  const renderHeader = () => {
    if (template === 'creative') {
      return (
        <div className={styles.header}>
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1">
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
            {personal.photo && (
              <div className="flex justify-center mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={personal.photo} alt="Profile" className="w-24 h-24 rounded-2xl object-cover border-2 border-fuchsia-400 shadow-sm" />
              </div>
            )}
          </div>
        </div>
      );
    }

    // For modern, minimal:
    let photoContainerClass = '';
    if (template === 'minimal') {
      photoContainerClass = 'w-20 h-20 rounded-none border border-slate-900 overflow-hidden shrink-0';
    } else { // modern
      photoContainerClass = 'w-20 h-20 rounded-xl border-2 border-indigo-500/20 overflow-hidden shrink-0';
    }

    return (
      <div className={styles.header}>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
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
          {personal.photo && (
            <div className={photoContainerClass}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={personal.photo} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      {renderHeader()}

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
