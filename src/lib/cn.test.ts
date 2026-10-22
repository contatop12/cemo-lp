// @vitest-environment node
import { cn } from './cn';

describe('cn', () => {
  it('junta classes e descarta valores falsy', () => {
    expect(cn('a', false, undefined, 'b')).toBe('a b');
  });

  it('retorna string vazia sem classes válidas', () => {
    expect(cn(null, false, undefined)).toBe('');
  });
});
