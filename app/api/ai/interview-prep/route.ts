import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { cvData, jobDescription } = await req.json();

    if (!cvData || !jobDescription) {
      return NextResponse.json({ error: 'CV verisi ve İş İlanı zorunludur.' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const prompt = `
Sen çok seçici, detaycı ve kıdemli bir İnsan Kaynakları Yöneticisisin. 
Aşağıdaki adayın CV'sini ve başvurduğu iş ilanını analiz ederek onu zorlayacak, deneyimlerini sorgulayacak ve ilandaki yetkinlikleri ölçümleyecek EN KRİTİK 3 mülakat sorusu hazırla.
Soruları Türkçe sor. Sadece JSON formatında dön, ekstra metin yazma.

Adayın CV'si: ${JSON.stringify(cvData)}
Başvurduğu İş İlanı: ${jobDescription}

Format:
{
  "questions": [
    "Soru 1",
    "Soru 2",
    "Soru 3"
  ]
}
`;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        data: [
          "CV'nizdeki deneyimlere baktığımızda, bu iş ilanında belirtilen kriz yönetimi beklentisini nasıl karşılayacağınızı anlatır mısınız?",
          "Daha önceki projenizde bahsettiğiniz %25'lik performans artışını tam olarak hangi metriklerle sağladınız?",
          "Neden özellikle bu pozisyonla ilgileniyorsunuz ve bizim şirketimize katabileceğiniz en büyük değer nedir?"
        ]
      });
    }

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse JSON
    let questions = [];
    try {
      const cleanText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
      const match = cleanText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      const jsonStr = match ? match[0] : cleanText;
      const parsed = JSON.parse(jsonStr);
      questions = parsed.questions || parsed;
    } catch (e) {
      // Fallback
      questions = [responseText];
    }

    return NextResponse.json({ data: questions });
  } catch (error: any) {
    if (error.message?.includes('429') || error.message?.includes('quota')) {
      return NextResponse.json({
        data: [
          "[Yapay Zeka API Kotanız Doldu - Örnek Soru] Müşteri şikayetini çözerken nasıl bir yol izlersiniz?",
          "[Yapay Zeka API Kotanız Doldu - Örnek Soru] Bize biraz kendinizden bahseder misiniz?",
          "[Yapay Zeka API Kotanız Doldu - Örnek Soru] Neden bizim şirketimizi tercih ettiniz?"
        ]
      });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
