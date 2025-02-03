import type { Metadata } from 'next';

import clx from 'clsx';

import Footer from '@/app/_components/Footer/Footer';
import Header from '@/app/_components/Header/Header';
import { Toaster } from '@/app/_components/ui/Sonner/Sonner';
import { Providers } from '@/app/_providers/providers';

import { HTRakikBold, ReadexProMedium, ReadexProRegular } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Epic Notes',
    default: 'Epic Notes',
  },
  description: 'Epic notes description',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clx(
        ReadexProRegular.variable,
        ReadexProMedium.variable,
        HTRakikBold.variable,
        'h-full'
      )}
      suppressHydrationWarning
    >
      <head>
        {/* <link href="favicon.svg" rel="icon" media="(prefers-color-scheme: light)"/> */}
      </head>
      <body className="h-full">
        <Providers>
          <div className="h-full flex flex-col">
            <Header />
            <main className="p-6 flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
