import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { priceId, userId, returnUrl } = await req.json();
    
    if (!priceId || !userId) {
      return Response.json({ error: 'Eksik parametreler (priceId veya userId)' }, { status: 400 });
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { userId },
      success_url: `${baseUrl}/dashboard?upgraded=true`,
      cancel_url: returnUrl || `${baseUrl}/upgrade`
    });
    
    return Response.json({ url: session.url });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
