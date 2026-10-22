// @vitest-environment node
import { track } from './events';

describe('track sem window (SSR)', () => {
  it('não lança', () => {
    expect(() => track('schedule_click', { location: 'header' })).not.toThrow();
  });
});
