import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe("pk_test_YOUR_PUBLIC_KEY_HERE");
