import { sendEmail } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const { email, fullName } = await req.json();

    if (!email) {
      return Response.json({ error: 'E-posta adresi eksik' }, { status: 400 });
    }

    const welcomeHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #0f172a;">
        <h2 style="color: #6366f1; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">CVio'ya Hoş Geldiniz! 🚀</h2>
        <p>Merhaba <strong>${fullName || 'Kullanıcı'}</strong>,</p>
        <p>CVio ailesine katıldığınız için çok mutluyuz. Yapay zeka destekli akıllı kariyer platformumuzla profesyonel CV'nizi oluşturmaya hemen başlayabilirsiniz.</p>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
          <h4 style="margin-top: 0; color: #475569;">Neler Yapabilirsiniz?</h4>
          <ul style="margin-bottom: 0; padding-left: 20px; font-size: 14px; color: #334155;">
            <li>Tek tıkla LinkedIn profilinizi içe aktarabilirsiniz.</li>
            <li>Claude 3.5 Sonnet desteği ile CV içeriklerinizi ATS uyumlu hale getirebilirsiniz.</li>
            <li>Şirketlere özel paylaşım linkleri üretebilirsiniz.</li>
            <li>AI Kariyer Koçu ile mülakatlara hazırlanabilirsiniz.</li>
          </ul>
        </div>

        <p style="font-size: 14px; color: #64748b;">Keyifli ve başarılı bir kariyer yolculuğu dileriz.</p>
        <p style="font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; margin-top: 30px;">
          Bu e-posta CVio otomatik sistemi tarafından gönderilmiştir.
        </p>
      </div>
    `;

    // Send to both user and testing address cemas4140@gmail.com
    await sendEmail({
      to: 'cemas4140@gmail.com',
      subject: `CVio Hoş Geldin Mesajı (${email})`,
      html: welcomeHtml,
    });

    try {
      // In Resend sandbox, we can only send to verified domain or owner. We still try sending to the user.
      if (email !== 'cemas4140@gmail.com') {
        await sendEmail({
          to: email,
          subject: 'CVio\'ya Hoş Geldiniz!',
          html: welcomeHtml,
        });
      }
    } catch (e) {
      console.warn('Failed to send to user email (probably due to Resend Sandbox mode):', e);
    }

    return Response.json({ success: true });
  } catch (err: any) {
    console.error('Welcome email API error:', err);
    return Response.json({ error: err.message || 'E-posta gönderilemedi' }, { status: 500 });
  }
}
