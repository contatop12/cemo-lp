import { Atkinson_Hyperlegible_Next, Manrope } from 'next/font/google';

// Títulos: sans moderna variável (wght 200–800); usar 600/700 com tracking levemente negativo.
// (Fase 2: substitui a serifa Literata — o cliente pediu um visual mais moderno e tipografia menor.)
export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
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
