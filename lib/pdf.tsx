import React from 'react';
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';

// Define styles for PDF rendering
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
    color: '#334155'
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#6366f1',
    paddingBottom: 15
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    letterSpacing: 0.5
  },
  headline: {
    fontSize: 12,
    color: '#4f46e5',
    fontFamily: 'Helvetica-Bold',
    marginTop: 4,
    marginBottom: 8
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 9,
    color: '#64748b',
    gap: 10
  },
  section: {
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingBottom: 4,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  summaryText: {
    fontSize: 9.5,
    textAlign: 'justify'
  },
  item: {
    marginBottom: 10
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
    fontSize: 10
  },
  itemSubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#4f46e5',
    fontSize: 9,
    marginBottom: 4,
    fontFamily: 'Helvetica-Bold'
  },
  itemDate: {
    color: '#64748b',
    fontFamily: 'Helvetica',
    fontSize: 9
  },
  itemDescription: {
    fontSize: 9,
    color: '#475569',
    textAlign: 'justify'
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  skillBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    fontSize: 8.5,
    color: '#334155'
  }
});

interface CVDocumentProps {
  data: any;
}

// React component representing the PDF document structure
export const CVDocument: React.FC<CVDocumentProps> = ({ data }) => {
  const { personal = {}, experience = [], education = [], skills = [], certifications = [] } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{personal.fullName || 'İsimsiz'}</Text>
          {personal.headline && <Text style={styles.headline}>{personal.headline}</Text>}
          
          <View style={styles.contactGrid}>
            {personal.email && <Text>✉ {personal.email}</Text>}
            {personal.location && <Text>📍 {personal.location}</Text>}
            {personal.linkedin && <Text>🔗 LinkedIn</Text>}
          </View>
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
export async function generatePDF(cvData: any): Promise<Buffer> {
  const doc = React.createElement(CVDocument, { data: cvData });
  const instance = pdf(doc as any);
  const blob = await instance.toBlob();
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
