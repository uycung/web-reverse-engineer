import React from 'react';
import FieldSupplyPage from '@/components/sample/FieldSupplyPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Field Supply — Durable Everyday Carry',
  description: 'Durable everyday carry and travel essentials designed for people who work between cities, studios, and the outdoors.',
};

export default function Page() {
  return <FieldSupplyPage />;
}
