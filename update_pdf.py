import os

pdf_path = r"C:\Users\win11\OneDrive\Belgeler\uygulama\lib\pdf.tsx"

with open(pdf_path, "r", encoding="utf-8") as f:
    content = f.read()

new_styles = """
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
"""

# Extract the block to replace
start_idx = content.find("// Premium layout styles for PDF rendering")
end_idx = content.find("});\n\ninterface CVDocumentProps {") + 3

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_styles + content[end_idx:]

# Update CVDocumentProps
content = content.replace(
    "interface CVDocumentProps {\n  data: any;\n}",
    "interface CVDocumentProps {\n  data: any;\n  template?: string;\n}"
)

# Update CVDocument
content = content.replace(
    "export const CVDocument: React.FC<CVDocumentProps> = ({ data }) => {",
    "export const CVDocument: React.FC<CVDocumentProps> = ({ data, template = 'modern' }) => {"
)
content = content.replace(
    "const { personal = {}, experience = [], education = [], skills = [], certifications = [] } = data;\n\n  return (",
    "const { personal = {}, experience = [], education = [], skills = [], certifications = [] } = data;\n\n  let styles = stylesModern;\n  if (template === 'minimal') styles = stylesMinimal;\n  if (template === 'creative') styles = stylesCreative;\n\n  return ("
)

# Update generatePDF
content = content.replace(
    "export async function generatePDF(cvData: any): Promise<Buffer> {",
    "export async function generatePDF(cvData: any, template?: string): Promise<Buffer> {"
)
content = content.replace(
    "const doc = React.createElement(CVDocument, { data: cvData });",
    "const doc = React.createElement(CVDocument, { data: cvData, template: template || cvData.template });"
)

# Update CoverLetterDocument
content = content.replace(
    "export const CoverLetterDocument: React.FC<CoverLetterDocumentProps> = ({",
    "export const CoverLetterDocument: React.FC<CoverLetterDocumentProps & { template?: string }> = ({"
)
content = content.replace(
    "dateStr\n}) => {\n  const paragraphs = content.split('\\n').filter(p => p.trim() !== '');",
    "dateStr,\n  template = 'modern'\n}) => {\n  const paragraphs = content.split('\\n').filter(p => p.trim() !== '');\n\n  let styles = stylesModern;\n  if (template === 'minimal') styles = stylesMinimal;\n  if (template === 'creative') styles = stylesCreative;"
)

with open(pdf_path, "w", encoding="utf-8") as f:
    f.write(content)

print("PDF styles updated successfully.")
