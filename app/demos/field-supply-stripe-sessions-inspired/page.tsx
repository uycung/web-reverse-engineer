import React from 'react';
import { Metadata } from 'next';
import StripeSessionsHeroWavePage from '@/components/demos/StripeSessionsHeroWavePage';

export const metadata: Metadata = {
  title: 'Field Supply - Stripe Sessions Hero Wave Demo',
  description:
    'Clean-room Field Supply demo applying an original Canvas 2D folded-ribbon hero background inspired by the runtime audit of stripe.com/sessions/2026.',
};

export default function StripeSessionsHeroWaveDemoPage() {
  return <StripeSessionsHeroWavePage />;
}
