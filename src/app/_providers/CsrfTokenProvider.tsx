'use client';

import { createContext, useContext } from 'react';

const CsrfTokenContext = createContext<string | null>(null);

interface CsrfTokenProviderProps {
  children: React.ReactNode;
  csrfToken: string;
}

const CsrfTokenProvider = ({ children, csrfToken }: CsrfTokenProviderProps) => {
  return (
    <CsrfTokenContext.Provider value={csrfToken}>
      {children}
    </CsrfTokenContext.Provider>
  );
};

const useCsrfToken = () => {
  return useContext(CsrfTokenContext);
};

export { CsrfTokenContext, CsrfTokenProvider, useCsrfToken };
