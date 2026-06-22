import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { questions, answers, jobDescription } = await req.json();

    if (!questions || !answers || !jobDescription) {
      return NextResponse.json({ error: 'Gerekli alanlar eksik.' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    let qaPairText = '';
    for (let i = 0; i < questions.length; i++) {
      qaPairText += `Soru ${i+1}: ${questions[i]}\nAdayın Cevabı: ${answers[i]}\n\n`;
    }

    const prompt = `
Sen kıdemli bir İnsan Kaynakları Yöneticisisin. 
Aşağıdaki adayın mülakatta verdiği cevapları analiz et. Başvurduğu iş ilanını da göz önünde bulundur.
Adaya dürüst, profesyonel ve yapıcı bir geri bildirim (Feedback) ver.
Her bir cevabı için kısa bir değerlendirme ve nasıl daha iyi yanıt verebileceğine dair ipucu ver. 
Formatı temiz bir Markdown formatında dön.

Başvurduğu İş İlanı: ${jobDescription}

Mülakat Soru ve Cevapları:
${qaPairText}
`;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        data: `### Genel Değerlendirme\nCevaplarınız genel olarak başarılı ancak daha yapılandırılmış (örneğin STAR metodu kullanarak) yanıtlar vermeniz işe alım şansınızı artıracaktır.\n\n### Detaylı Analiz\n1. Soruya verdiğiniz cevapta rakamsal metrikler eksik. "Satışları artırdım" demek yerine "%20 artırdım" demelisiniz.\n2. Soru için harika bir kriz yönetimi örneği vermişsiniz, tebrikler!`
      });
    }

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    return NextResponse.json({ data: responseText });
  } catch (error: any) {
    if (error.message?.includes('429') || error.message?.includes('quota')) {
      return NextResponse.json({ data: `### ⚠️ API Kotası Doldu\nMevcut Google Gemini API anahtarınızın ücretsiz kotası (rate limit) aşılmış durumda. Lütfen [Google AI Studio](https://aistudio.google.com/) üzerinden yeni bir anahtar alın veya kısa bir süre bekleyin.\n\n*Örnek Geri Bildirim: Verdiğiniz yanıt fena değildi ancak iş ilanındaki detaylara daha fazla değinmelisiniz.*` });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
