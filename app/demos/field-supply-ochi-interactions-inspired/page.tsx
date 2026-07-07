import React from 'react';
import { Metadata } from 'next';
import FieldSupplyOchiInteractionsPage from '@/components/demos/FieldSupplyOchiInteractionsPage';

export const metadata: Metadata = {
  title: 'Field Supply - Ochi Interactions Demo',
  description:
    'Clean-room Field Supply demo applying original magnetic pointer interactions, pointer-following eyes, and smooth text reveal bands inspired by ochi.design.',
};

export default function FieldSupplyOchiInteractionsDemoPage() {
  return <FieldSupplyOchiInteractionsPage />;
}
