'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, PlusCircle, Wand2 } from 'lucide-react';

interface CVFormProps {
  cvData: any;
  setCvData: React.Dispatch<React.SetStateAction<any>>;
  onOptimize: (targetCompany?: string) => Promise<void>;
  optimizing: boolean;
}

export default function CVForm({ cvData, setCvData, onOptimize, optimizing }: CVFormProps) {
  const {
    personal = { fullName: '', headline: '', location: '', email: '', linkedin: '', summary: '' },
    experience = [],
    education = [],
    skills = [],
    certifications = []
  } = cvData;

  const handlePersonalChange = (field: string, value: string) => {
    setCvData((prev: any) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  };

  // Experience Handlers
  const handleExperienceChange = (index: number, field: string, value: any) => {
    setCvData((prev: any) => {
      const newExp = [...(prev.experience || [])];
      newExp[index] = { ...newExp[index], [field]: value };
      return { ...prev, experience: newExp };
    });
  };

  const addExperience = () => {
    setCvData((prev: any) => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        { title: '', company: '', startDate: '', endDate: '', current: false, description: '', location: '' }
      ]
    }));
  };

  const removeExperience = (index: number) => {
    setCvData((prev: any) => ({
      ...prev,
      experience: (prev.experience || []).filter((_: any, i: number) => i !== index)
    }));
  };

  // Education Handlers
  const handleEducationChange = (index: number, field: string, value: any) => {
    setCvData((prev: any) => {
      const newEdu = [...(prev.education || [])];
      newEdu[index] = { ...newEdu[index], [field]: value };
      return { ...prev, education: newEdu };
    });
  };

  const addEducation = () => {
    setCvData((prev: any) => ({
      ...prev,
      education: [
        ...(prev.education || []),
        { school: '', degree: '', field: '', startYear: '', endYear: '' }
      ]
    }));
  };

  const removeEducation = (index: number) => {
    setCvData((prev: any) => ({
      ...prev,
      education: (prev.education || []).filter((_: any, i: number) => i !== index)
    }));
  };

  // Certification Handlers
  const handleCertChange = (index: number, field: string, value: any) => {
    setCvData((prev: any) => {
      const newCerts = [...(prev.certifications || [])];
      newCerts[index] = { ...newCerts[index], [field]: value };
      return { ...prev, certifications: newCerts };
    });
  };

  const addCert = () => {
    setCvData((prev: any) => ({
      ...prev,
      certifications: [
        ...(prev.certifications || []),
        { name: '', issuer: '', date: '' }
      ]
    }));
  };

  const removeCert = (index: number) => {
    setCvData((prev: any) => ({
      ...prev,
      certifications: (prev.certifications || []).filter((_: any, i: number) => i !== index)
    }));
  };

  // Skills Handler
  const handleSkillsChange = (value: string) => {
    const skillList = value.split(',').map(s => s.trim()).filter(s => s.length > 0);
    setCvData((prev: any) => ({
      ...prev,
      skills: skillList
    }));
  };

  return (
    <div className="space-y-6">
      {/* AI CV Improver Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-violet-900/40 via-indigo-900/40 to-indigo-950/50 border border-indigo-800/40 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
            <Wand2 className="w-4 h-4 text-indigo-400" />
            AI ile CV'nizi Güçlendirin
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Claude AI ile özgeçmişinizi profesyonel standartlara ve ATS kriterlerine uygun hale getirin.
          </p>
        </div>
        <Button
          onClick={() => onOptimize()}
          disabled={optimizing}
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 shrink-0 font-medium"
        >
          {optimizing ? 'İyileştiriliyor...' : 'Yapay Zeka ile İyileştir'}
        </Button>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-4 bg-slate-950 border border-slate-800 p-1 rounded-xl">
          <TabsTrigger value="personal" className="text-xs text-slate-400 data-[state=active]:bg-slate-800 data-[state=active]:text-white">Kişisel</TabsTrigger>
          <TabsTrigger value="experience" className="text-xs text-slate-400 data-[state=active]:bg-slate-800 data-[state=active]:text-white">Deneyim</TabsTrigger>
          <TabsTrigger value="education" className="text-xs text-slate-400 data-[state=active]:bg-slate-800 data-[state=active]:text-white">Eğitim</TabsTrigger>
          <TabsTrigger value="skills" className="text-xs text-slate-400 data-[state=active]:bg-slate-800 data-[state=active]:text-white">Yetenek & Sertifika</TabsTrigger>
        </TabsList>

        {/* PERSONAL DETAILS */}
        <TabsContent value="personal" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-200 text-xs">Ad Soyad</Label>
              <Input
                id="fullName"
                value={personal.fullName || ''}
                onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                placeholder="Örn: Ahmet Yılmaz"
                className="bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headline" className="text-slate-200 text-xs">Ünvan</Label>
              <Input
                id="headline"
                value={personal.headline || ''}
                onChange={(e) => handlePersonalChange('headline', e.target.value)}
                placeholder="Örn: Senior Frontend Developer"
                className="bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200 text-xs">E-posta</Label>
              <Input
                id="email"
                type="email"
                value={personal.email || ''}
                onChange={(e) => handlePersonalChange('email', e.target.value)}
                placeholder="ahmet@mail.com"
                className="bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-slate-200 text-xs">Konum</Label>
              <Input
                id="location"
                value={personal.location || ''}
                onChange={(e) => handlePersonalChange('location', e.target.value)}
                placeholder="İstanbul, Türkiye"
                className="bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-slate-200 text-xs">Kişisel Web Sitesi / Portfolyo</Label>
              <Input
                id="linkedin"
                value={personal.linkedin || ''}
                onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
                placeholder="yazar.com veya github.com/ahmet"
                className="bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary" className="text-slate-200 text-xs">Özet / Hakkımda</Label>
            <Textarea
              id="summary"
              value={personal.summary || ''}
              onChange={(e) => handlePersonalChange('summary', e.target.value)}
              placeholder="Yaratıcı ve çözüm odaklı 5+ yıl deneyimli yazılım geliştirici..."
              rows={4}
              className="bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-indigo-500 min-h-[100px]"
            />
          </div>
        </TabsContent>

        {/* EXPERIENCE DETAILS */}
        <TabsContent value="experience" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold text-white">İş Deneyimleri</h4>
            <Button
              onClick={addExperience}
              type="button"
              variant="outline"
              size="sm"
              className="border-indigo-600/30 text-indigo-400 hover:bg-indigo-950/20 text-xs font-semibold gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              İş Ekle
            </Button>
          </div>

          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
            {experience.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-xs border border-dashed border-slate-800 rounded-lg">
                Henüz deneyim eklemediniz.
              </div>
            ) : (
              experience.map((exp: any, idx: number) => (
                <div key={idx} className="p-4 rounded-lg bg-slate-950/30 border border-slate-800 relative space-y-3">
                  <button
                    type="button"
                    onClick={() => removeExperience(idx)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-3 mr-6">
                    <div className="space-y-1">
                      <Label className="text-slate-400 text-[10px] uppercase">Pozisyon</Label>
                      <Input
                        value={exp.title || ''}
                        onChange={(e) => handleExperienceChange(idx, 'title', e.target.value)}
                        placeholder="Frontend Architect"
                        className="h-8 text-xs bg-slate-950/50 border-slate-850"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-slate-400 text-[10px] uppercase">Şirket Adı</Label>
                      <Input
                        value={exp.company || ''}
                        onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)}
                        placeholder="Örn: Teknoloji Firması"
                        className="h-8 text-xs bg-slate-950/50 border-slate-850"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-slate-400 text-[10px] uppercase">Başlangıç Tarihi</Label>
                      <Input
                        value={exp.startDate || ''}
                        onChange={(e) => handleExperienceChange(idx, 'startDate', e.target.value)}
                        placeholder="Ocak 2023"
                        className="h-8 text-xs bg-slate-950/50 border-slate-850"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-slate-400 text-[10px] uppercase">Bitiş Tarihi</Label>
                      <Input
                        value={exp.endDate || ''}
                        onChange={(e) => handleExperienceChange(idx, 'endDate', e.target.value)}
                        placeholder="Aralık 2024"
                        disabled={exp.current}
                        className="h-8 text-xs bg-slate-950/50 border-slate-850"
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-5">
                      <input
                        type="checkbox"
                        id={`current-${idx}`}
                        checked={exp.current || false}
                        onChange={(e) => handleExperienceChange(idx, 'current', e.target.checked)}
                        className="rounded border-slate-850 bg-slate-950/50 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor={`current-${idx}`} className="text-[11px] text-slate-300 cursor-pointer select-none">
                        Halen Çalışıyorum
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1">
                      <Label className="text-slate-400 text-[10px] uppercase">Açıklama / Başarılar</Label>
                      <Textarea
                        value={exp.description || ''}
                        onChange={(e) => handleExperienceChange(idx, 'description', e.target.value)}
                        placeholder="Proje başarılarınızı ve görevlerinizi listeleyin..."
                        rows={3}
                        className="text-xs bg-slate-950/50 border-slate-850"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* EDUCATION DETAILS */}
        <TabsContent value="education" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold text-white">Eğitim Geçmişi</h4>
            <Button
              onClick={addEducation}
              type="button"
              variant="outline"
              size="sm"
              className="border-indigo-600/30 text-indigo-400 hover:bg-indigo-950/20 text-xs font-semibold gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Eğitim Ekle
            </Button>
          </div>

          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
            {education.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-xs border border-dashed border-slate-800 rounded-lg">
                Henüz eğitim eklemediniz.
              </div>
            ) : (
              education.map((edu: any, idx: number) => (
                <div key={idx} className="p-4 rounded-lg bg-slate-950/30 border border-slate-800 relative space-y-3">
                  <button
                    type="button"
                    onClick={() => removeEducation(idx)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-3 mr-6">
                    <div className="space-y-1">
                      <Label className="text-slate-400 text-[10px] uppercase">Okul / Üniversite</Label>
                      <Input
                        value={edu.school || ''}
                        onChange={(e) => handleEducationChange(idx, 'school', e.target.value)}
                        placeholder="İstanbul Teknik Üniversitesi"
                        className="h-8 text-xs bg-slate-950/50 border-slate-850"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-slate-400 text-[10px] uppercase">Derece (Örn: Lisans)</Label>
                      <Input
                        value={edu.degree || ''}
                        onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)}
                        placeholder="Lisans"
                        className="h-8 text-xs bg-slate-950/50 border-slate-850"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 space-y-1">
                      <Label className="text-slate-400 text-[10px] uppercase">Bölüm / Alan</Label>
                      <Input
                        value={edu.field || ''}
                        onChange={(e) => handleEducationChange(idx, 'field', e.target.value)}
                        placeholder="Bilgisayar Mühendisliği"
                        className="h-8 text-xs bg-slate-950/50 border-slate-850"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label className="text-slate-400 text-[10px] uppercase">Başl. Yılı</Label>
                        <Input
                          value={edu.startYear || ''}
                          onChange={(e) => handleEducationChange(idx, 'startYear', e.target.value)}
                          placeholder="2018"
                          className="h-8 text-xs bg-slate-950/50 border-slate-850 px-1.5"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-slate-400 text-[10px] uppercase">Bitiş Yılı</Label>
                        <Input
                          value={edu.endYear || ''}
                          onChange={(e) => handleEducationChange(idx, 'endYear', e.target.value)}
                          placeholder="2022"
                          className="h-8 text-xs bg-slate-950/50 border-slate-850 px-1.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* SKILLS AND CERTIFICATIONS */}
        <TabsContent value="skills" className="space-y-6 pt-4">
          {/* Skills Input */}
          <div className="space-y-2">
            <Label htmlFor="skills-input" className="text-slate-200 text-xs">Yetenekler (Virgülle Ayırarak Yazın)</Label>
            <Textarea
              id="skills-input"
              value={skills.join(', ')}
              onChange={(e) => handleSkillsChange(e.target.value)}
              placeholder="TypeScript, React, Next.js, Node.js, TailwindCSS"
              rows={2}
              className="bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus-visible:ring-indigo-500 min-h-[60px] text-xs"
            />
            <p className="text-[10px] text-slate-500">
              Yeteneklerinizin listesini aralarına virgül koyarak yazın.
            </p>
          </div>

          <hr className="border-slate-800" />

          {/* Certifications Input */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-semibold text-white">Sertifikalar</h4>
              <Button
                onClick={addCert}
                type="button"
                variant="outline"
                size="sm"
                className="border-indigo-600/30 text-indigo-400 hover:bg-indigo-950/20 text-xs font-semibold gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Sertifika Ekle
              </Button>
            </div>

            <div className="space-y-4 max-h-[30vh] overflow-y-auto pr-1">
              {certifications.length === 0 ? (
                <div className="text-center py-6 text-slate-500 text-xs border border-dashed border-slate-800 rounded-lg">
                  Henüz sertifika eklemediniz.
                </div>
              ) : (
                certifications.map((cert: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-lg bg-slate-950/30 border border-slate-800 relative space-y-3">
                    <button
                      type="button"
                      onClick={() => removeCert(idx)}
                      className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-2 gap-3 mr-6">
                      <div className="space-y-1">
                        <Label className="text-slate-400 text-[10px] uppercase">Sertifika Adı</Label>
                        <Input
                          value={cert.name || ''}
                          onChange={(e) => handleCertChange(idx, 'name', e.target.value)}
                          placeholder="AWS Solutions Architect"
                          className="h-8 text-xs bg-slate-950/50 border-slate-850"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-slate-400 text-[10px] uppercase">Veren Kurum</Label>
                        <Input
                          value={cert.issuer || ''}
                          onChange={(e) => handleCertChange(idx, 'issuer', e.target.value)}
                          placeholder="Amazon Web Services"
                          className="h-8 text-xs bg-slate-950/50 border-slate-850"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mr-6">
                      <div className="space-y-1">
                        <Label className="text-slate-400 text-[10px] uppercase">Tarih</Label>
                        <Input
                          value={cert.date || ''}
                          onChange={(e) => handleCertChange(idx, 'date', e.target.value)}
                          placeholder="Eylül 2023"
                          className="h-8 text-xs bg-slate-950/50 border-slate-850"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
