import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      '_materiais/**',
      '.superpowers/**',
      'test-results/**',
      'playwright-report/**',
      'next-env.d.ts',
      'src/lib/redirects/generated.ts',
    ],
  },
];

export default config;
