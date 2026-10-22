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
