import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RMCraft - README Generator',
  description: 'Generate professional GitHub READMEs instantly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}