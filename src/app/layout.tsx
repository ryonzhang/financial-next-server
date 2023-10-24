import 'semantic-ui-css/semantic.min.css';
import '@/app/globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import React from 'react';

export const metadata: Metadata = {
  title: 'Finance App',
  description: 'Finance App',
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
