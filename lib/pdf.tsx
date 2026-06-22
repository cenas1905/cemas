import React from 'react';
import { Page, Text, View, Document, StyleSheet, renderToBuffer, Image, Font } from '@react-pdf/renderer';
import path from 'path';

// Register Roboto font that fully supports Turkish characters (Latin Extended UTF-8)
Font.register({
  family: 'Roboto',
  fonts: [
    { src: path.join(process.cwd(), 'public', 'fonts', 'Roboto-Regular.ttf') },
    { src: path.join(process.cwd(), 'public', 'fonts', 'Roboto-Bold.ttf'), fontWeight: 'bold' }
  ]
});


const basePage = {
  paddingHorizontal: 45,
  paddingVertical: 40,
  fontFamily: 'Roboto',
  fontSize: 9.5,
  lineHeight: 1.5,
};

// Premium layout styles for PDF rendering
const stylesModern = StyleSheet.create({
  page: { ...basePage, color: '#334155' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottomWidth: 2, borderBottomColor: '#6366f1', paddingBottom: 15 },
  photo: { width: 65, height: 65, borderRadius: 32.5, marginLeft: 15, objectFit: 'cover' },
  name: { fontSize: 22, fontFamily: 'Roboto', fontWeight: 'bold', color: '#0f172a', letterSpacing: 0.5 },
  headline: { fontSize: 11, color: '#4f46e5', fontFamily: 'Roboto', fontWeight: 'bold', marginTop: 4, marginBottom: 8 },
  contactGrid: { flexDirection: 'row', flexWrap: 'wrap', fontSize: 8.5, color: '#64748b', gap: 12 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 10.5, fontFamily: 'Roboto', fontWeight: 'bold', color: '#0f172a', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingBottom: 4, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.75 },
  summaryText: { fontSize: 9, textAlign: 'justify', lineHeight: 1.6, color: '#475569' },
  item: { marginBottom: 12 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', fontFamily: 'Roboto', fontWeight: 'bold', color: '#1e293b', fontSize: 9.5, marginBottom: 2 },
  itemSubHeader: { flexDirection: 'row', justifyContent: 'space-between', color: '#4f46e5', fontSize: 8.5, marginBottom: 4, fontFamily: 'Roboto', fontWeight: 'bold' },
  itemDate: { color: '#64748b', fontFamily: 'Roboto', fontWeight: 'normal', fontSize: 8.5 },
  itemDescription: { fontSize: 8.5, color: '#475569', textAlign: 'justify', lineHeight: 1.5 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skillBadge: { backgroundColor: '#f1f5f9', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, fontSize: 8, color: '#334155', fontFamily: 'Roboto' }
});

const stylesMinimal = StyleSheet.create({
  page: { ...basePage, color: '#111827' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, paddingBottom: 10 },
  photo: { width: 60, height: 60, borderRadius: 0, marginLeft: 15, objectFit: 'cover' },
  name: { fontSize: 24, fontFamily: 'Roboto', fontWeight: 'bold', color: '#000000', letterSpacing: -0.5 },
  headline: { fontSize: 12, color: '#4b5563', fontFamily: 'Roboto', fontWeight: 'normal', marginTop: 4, marginBottom: 8 },
  contactGrid: { flexDirection: 'row', flexWrap: 'wrap', fontSize: 8.5, color: '#4b5563', gap: 15 },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 11, fontFamily: 'Roboto', fontWeight: 'bold', color: '#000000', borderTopWidth: 1, borderTopColor: '#000000', paddingTop: 6, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  summaryText: { fontSize: 9.5, textAlign: 'justify', lineHeight: 1.6, color: '#374151' },
  item: { marginBottom: 14 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', fontFamily: 'Roboto', fontWeight: 'bold', color: '#000000', fontSize: 10, marginBottom: 2 },
  itemSubHeader: { flexDirection: 'row', justifyContent: 'space-between', color: '#374151', fontSize: 9, marginBottom: 4, fontFamily: 'Roboto', fontWeight: 'normal' },
  itemDate: { color: '#6b7280', fontFamily: 'Roboto', fontWeight: 'normal', fontSize: 8.5 },
  itemDescription: { fontSize: 9, color: '#374151', textAlign: 'justify', lineHeight: 1.6 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillBadge: { fontSize: 9, color: '#111827', fontFamily: 'Roboto', fontWeight: 'bold' }
});

const stylesCreative = StyleSheet.create({
  page: { ...basePage, color: '#27272a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25, backgroundColor: '#fdf4ff', padding: 20, borderRadius: 8 },
  photo: { width: 70, height: 70, borderRadius: 16, marginLeft: 15, objectFit: 'cover' },
  name: { fontSize: 26, fontFamily: 'Roboto', fontWeight: 'bold', color: '#d946ef', letterSpacing: 0 },
  headline: { fontSize: 12, color: '#7e22ce', fontFamily: 'Roboto', fontWeight: 'bold', marginTop: 4, marginBottom: 8 },
  contactGrid: { flexDirection: 'row', flexWrap: 'wrap', fontSize: 8.5, color: '#a855f7', gap: 12 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 12, fontFamily: 'Roboto', fontWeight: 'bold', color: '#d946ef', borderLeftWidth: 3, borderLeftColor: '#d946ef', paddingLeft: 8, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  summaryText: { fontSize: 9.5, textAlign: 'justify', lineHeight: 1.6, color: '#3f3f46' },
  item: { marginBottom: 15, paddingLeft: 10, borderLeftWidth: 1, borderLeftColor: '#f3e8ff' },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', fontFamily: 'Roboto', fontWeight: 'bold', color: '#7e22ce', fontSize: 10, marginBottom: 2 },
  itemSubHeader: { flexDirection: 'row', justifyContent: 'space-between', color: '#a855f7', fontSize: 9, marginBottom: 4, fontFamily: 'Roboto', fontWeight: 'bold' },
  itemDate: { color: '#d8b4fe', fontFamily: 'Roboto', fontWeight: 'normal', fontSize: 8.5 },
  itemDescription: { fontSize: 9, color: '#52525b', textAlign: 'justify', lineHeight: 1.5 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skillBadge: { backgroundColor: '#fae8ff', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, fontSize: 8, color: '#c026d3', fontFamily: 'Roboto', fontWeight: 'bold' }
});


interface CVDocumentProps {
  data: any;
  template?: string;
}

// React component representing the PDF document structure
export const CVDocument: React.FC<CVDocumentProps> = ({ data, template = 'modern' }) => {
  const { personal = {}, experience = [], education = [], skills = [], certifications = [] } = data;

  let styles: any = stylesModern;
  if (template === 'minimal') styles = stylesMinimal;
  if (template === 'creative') styles = stylesCreative;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{personal.fullName || 'İsimsiz'}</Text>
            {personal.headline && <Text style={styles.headline}>{personal.headline}</Text>}

            <View style={styles.contactGrid}>
              {personal.email && <Text>✉  {personal.email}</Text>}
              {personal.location && <Text>📍  {personal.location}</Text>}
              {personal.linkedin && <Text>🔗  {personal.linkedin}</Text>}
            </View>
          </View>
          {personal.photo && (
            <Image src={personal.photo} style={styles.photo} />
          )}
        </View>

        {/* Summary Section */}
        {personal.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Özet</Text>
            <Text style={styles.summaryText}>{personal.summary}</Text>
          </View>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Deneyim</Text>
            {experience.map((exp: any, index: number) => (
              <View key={index} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text>{exp.title}</Text>
                  <Text style={styles.itemDate}>
                    {exp.startDate} - {exp.current ? 'Günümüz' : exp.endDate}
                  </Text>
                </View>
                <View style={styles.itemSubHeader}>
                  <Text>{exp.company}{exp.location ? `, ${exp.location}` : ''}</Text>
                </View>
                {exp.description && (
                  <Text style={styles.itemDescription}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Eğitim</Text>
            {education.map((edu: any, index: number) => (
              <View key={index} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text>{edu.school}</Text>
                  <Text style={styles.itemDate}>
                    {edu.startYear} - {edu.endYear}
                  </Text>
                </View>
                <View style={styles.itemSubHeader}>
                  <Text>
                    {edu.degree}{edu.field ? ` - ${edu.field}` : ''}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Certifications Section */}
        {certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sertifikalar</Text>
            {certifications.map((cert: any, index: number) => (
              <View key={index} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text>{cert.name}</Text>
                  {cert.date && <Text style={styles.itemDate}>{cert.date}</Text>}
                </View>
                {cert.issuer && (
                  <View style={styles.itemSubHeader}>
                    <Text>{cert.issuer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Yetenekler</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill: string, index: number) => (
                <Text key={index} style={styles.skillBadge}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

// Main function to convert CV data object into a PDF Buffer
export async function generatePDF(cvData: any, template?: string): Promise<Buffer> {
  const doc = React.createElement(CVDocument, { data: cvData, template: template || cvData.template });
  return await renderToBuffer(doc as any);
}

interface CoverLetterDocumentProps {
  companyName: string;
  jobTitle: string;
  content: string;
  personal: any;
  dateStr: string;
}

export const CoverLetterDocument: React.FC<CoverLetterDocumentProps & { template?: string }> = ({
  companyName,
  jobTitle,
  content,
  personal = {},
  dateStr,
  template = 'modern'
}) => {
  const paragraphs = content.split('\n').filter(p => p.trim() !== '');

  let styles: any = stylesModern;
  if (template === 'minimal') styles = stylesMinimal;
  if (template === 'creative') styles = stylesCreative;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Personal Details Header */}
        <View style={{ marginBottom: 30, borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingBottom: 15 }}>
          <Text style={{ fontSize: 20, fontFamily: 'Roboto', fontWeight: 'bold', color: '#0f172a' }}>
            {personal.fullName || 'İsim Soyisim'}
          </Text>
          {personal.headline && (
            <Text style={{ fontSize: 10, color: '#6366f1', fontFamily: 'Roboto', fontWeight: 'bold', marginTop: 4 }}>
              {personal.headline}
            </Text>
          )}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, fontSize: 8.5, color: '#64748b', marginTop: 8 }}>
            {personal.email && <Text>✉  {personal.email}</Text>}
            {personal.location && <Text>📍  {personal.location}</Text>}
            {personal.linkedin && <Text>🔗  {personal.linkedin}</Text>}
          </View>
        </View>

        {/* Date and Company Reference */}
        <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', fontSize: 9, color: '#64748b' }}>
          <View>
            <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold', color: '#1e293b', marginBottom: 2 }}>Kime:</Text>
            <Text style={{ fontSize: 9.5 }}>{companyName} İşe Alım Ekibi</Text>
            <Text style={{ fontSize: 9.5 }}>Başvuru: {jobTitle}</Text>
          </View>
          <Text>{dateStr}</Text>
        </View>

        {/* Letter Content */}
        <View style={{ flex: 1, fontSize: 9.5, lineHeight: 1.6, color: '#334155' }}>
          {paragraphs.map((para, index) => (
            <Text key={index} style={{ marginBottom: 12, textAlign: 'justify' }}>
              {para}
            </Text>
          ))}
        </View>

        {/* Sign-off */}
        <View style={{ marginTop: 40, borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 15 }}>
          <Text style={{ fontSize: 9, color: '#64748b' }}>Saygılarımla,</Text>
          <Text style={{ fontSize: 10, fontFamily: 'Roboto', fontWeight: 'bold', color: '#0f172a', marginTop: 5 }}>
            {personal.fullName || 'İsim Soyisim'}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export async function generateCoverLetterPDF(
  companyName: string,
  jobTitle: string,
  content: string,
  personal: any
): Promise<Buffer> {
  const dateStr = new Date().toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const doc = React.createElement(CoverLetterDocument, {
    companyName,
    jobTitle,
    content,
    personal,
    dateStr
  });
  return await renderToBuffer(doc as any);
}
