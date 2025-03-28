'use client';

import { useCsrfToken } from '@/app/_providers/csrf-token-provider';

const CSRF_FIELD_NAME = 'csrf_token';

const CsrfTokenField = () => {
  const token = useCsrfToken() || 'missing';
  return <input type="hidden" name={CSRF_FIELD_NAME} value={token} />;
};

export { CSRF_FIELD_NAME, CsrfTokenField };
