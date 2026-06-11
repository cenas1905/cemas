import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('Warning: STRIPE_SECRET_KEY environment variable is not defined.');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  // Use the latest API version or let it fall back
});
