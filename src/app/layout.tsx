import 'semantic-ui-css/semantic.min.css';
import '@/app/globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import TopSearchRibbon from '@/app/(support)/TopSearchRibbon';
import React from 'react';
import Menu from '@/app/components/Menu';

export const metadata: Metadata = {
  title: 'Phantom App',
  description: 'Phantom App',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
