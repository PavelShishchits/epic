import type { Metadata } from 'next';
import { HTRakikBold, ReadexProMedium, ReadexProRegular } from './fonts';
import clx from 'clsx';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { CsrfTokenProvider } from '@/providers/CsrfTokenProvider';
import { headers } from 'next/headers';
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
  const h = await headers();

  const csrfToken = h.get('x-csrf-token') || 'missing';

  return (
    <html
      lang="en"
      className={clx(
        ReadexProRegular.variable,
        ReadexProMedium.variable,
        HTRakikBold.variable,
        'h-full'
      )}
    >
      <head>
        {/* <link href="favicon.svg" rel="icon" media="(prefers-color-scheme: light)"/> */}
      </head>
      <body className="h-full">
        <CsrfTokenProvider csrfToken={csrfToken}>
          <div className="h-full flex flex-col">
            <Header />
            <main className="p-6 flex-1">{children}</main>
            <Footer />
          </div>
        </CsrfTokenProvider>
      </body>
    </html>
  );
}
