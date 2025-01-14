import { headers } from 'next/headers';

import { CsrfTokenProvider } from './csrf-token-provider';
import { ThemeProvider } from './theme-provider';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = async ({ children }: ProvidersProps) => {
  const h = await headers();

  const csrfToken = h.get('x-csrf-token') || 'missing';

  return (
    <CsrfTokenProvider csrfToken={csrfToken}>
      <ThemeProvider
        attribute={'class'}
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </CsrfTokenProvider>
  );
};

export { Providers };
