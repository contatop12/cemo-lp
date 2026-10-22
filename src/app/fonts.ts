import { Atkinson_Hyperlegible_Next, Literata } from 'next/font/google';

// Títulos: serifa editorial variável (wght + opsz); usar 500/600.
export const literata = Literata({
  subsets: ['latin'],
  variable: '--font-literata',
  display: 'swap',
  axes: ['opsz'],
});

// Corpo: desenhada para baixa visão; variável (wght 200–800); usar 400/500/700.
// O Next não tem métricas de override para a família "Next"; fallback explícito sem ajuste automático
// (CLS medido na Task 17).
export const atkinson = Atkinson_Hyperlegible_Next({
  subsets: ['latin'],
  variable: '--font-atkinson',
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['Arial', 'system-ui', 'sans-serif'],
});
