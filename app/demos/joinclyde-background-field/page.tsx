import React from 'react';
import { Metadata } from 'next';
import JoinClydeBackgroundFieldPage from '@/components/demos/JoinClydeBackgroundFieldPage';

export const metadata: Metadata = {
  title: 'Field Supply - JoinClyde Background Field Demo',
  description:
    'Clean-room Field Supply demo applying original Canvas 2D background-field principles inspired by joinclyde.com.',
};

export default function JoinClydeBackgroundFieldDemoPage() {
  return <JoinClydeBackgroundFieldPage />;
}
