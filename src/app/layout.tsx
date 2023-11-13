import '../styles/index.css';
import { PropsWithChildren } from 'react';
import { Poppins } from 'next/font/google';
import type { Metadata } from 'next';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'P12 Gpark Studio',
  description: 'P12 Gpark Studio',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="container pt-5 py-7.5">{children}</main>
      </body>
    </html>
  );
}
