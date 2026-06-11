const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not defined.');
    return { error: 'RESEND_API_KEY missing' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Resend API call failed: ${errorText}`);
      return { error: errorText };
    }

    const data = await res.json();
    return { data };
  } catch (err: any) {
    console.error(`Error sending email: ${err.message}`);
    return { error: err.message };
  }
}
