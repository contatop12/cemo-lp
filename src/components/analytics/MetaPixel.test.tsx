import { act, render } from '@testing-library/react';
import { CONSENT_CHANGE_EVENT, CONSENT_STORAGE_KEY } from '@/lib/analytics/consent';
import { MetaPixel } from './MetaPixel';

let pathname = '/';
vi.mock('next/navigation', () => ({ usePathname: () => pathname }));

type FbqWindow = Window & { fbq?: { queue: unknown[][] }; _fbq?: unknown };
const SCRIPT = 'script[src="https://connect.facebook.net/en_US/fbevents.js"]';

function choose(choice: 'granted' | 'denied') {
  act(() => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  });
}

beforeEach(() => {
  pathname = '/';
  window.localStorage.clear();
  delete (window as FbqWindow).fbq;
  delete (window as FbqWindow)._fbq;
  document.querySelectorAll(SCRIPT).forEach((s) => s.remove());
});

describe('MetaPixel (pixel que o WordPress carregava fora do GTM)', () => {
  it('sem consentimento de publicidade não carrega nada', () => {
    render(<MetaPixel pixelId="111" />);
    choose('denied');
    expect(document.querySelector(SCRIPT)).toBeNull();
    expect((window as FbqWindow).fbq).toBeUndefined();
  });

  it('com consentimento carrega o fbevents uma vez e manda PageView só para este pixel', () => {
    render(<MetaPixel pixelId="222" />);
    choose('granted');
    expect(document.querySelectorAll(SCRIPT)).toHaveLength(1);
    expect((window as FbqWindow).fbq?.queue).toEqual([
      ['consent', 'grant'],
      ['init', '222'],
      ['trackSingle', '222', 'PageView'],
    ]);
  });

  it('cada troca de página gera um novo PageView, sem novo init', () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, 'granted');
    const { rerender } = render(<MetaPixel pixelId="333" />);
    pathname = '/convenios/';
    rerender(<MetaPixel pixelId="333" />);
    const queue = (window as FbqWindow).fbq?.queue ?? [];
    expect(queue.filter((c) => c[0] === 'init')).toHaveLength(1);
    expect(queue.filter((c) => c[0] === 'trackSingle')).toHaveLength(2);
  });

  it('recusar depois de aceitar revoga o consentimento no pixel', () => {
    render(<MetaPixel pixelId="444" />);
    choose('granted');
    choose('denied');
    expect((window as FbqWindow).fbq?.queue.at(-1)).toEqual(['consent', 'revoke']);
  });
});
