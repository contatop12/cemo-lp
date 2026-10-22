// @vitest-environment node
import { sanitizeText } from './sanitize';

describe('sanitizeText', () => {
  it('remove caracteres de controle e < >', () => {
    expect(sanitizeText('a\u0000b\u001fc<d>e', 100)).toBe('abcde');
  });

  it('colapsa espaços e faz trim', () => {
    expect(sanitizeText('  a   b ', 100)).toBe('a b');
  });

  it('quebras de linha viram espaço', () => {
    expect(sanitizeText('a\nb\tc', 100)).toBe('a b c');
  });

  it('corta no limite', () => {
    expect(sanitizeText('abcdef', 3)).toBe('abc');
  });
});

describe('fix: apóstrofos', () => {
  it('normaliza apóstrofos tipográficos para o reto', () => {
    expect(sanitizeText('D’Ávila Sant‘Anna Dʼx a´b c`d', 100)).toBe("D'Ávila Sant'Anna D'x a'b c'd");
  });
});
