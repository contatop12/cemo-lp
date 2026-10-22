import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { siteSettings } from '@/content/fixtures/site-settings';
import { StickyMobileCTA } from './StickyMobileCTA';

type DataLayerWindow = Window & { dataLayer?: unknown[] };

let observerCallback: IntersectionObserverCallback | null = null;

class FakeObserver {
  constructor(cb: IntersectionObserverCallback) {
    observerCallback = cb;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

function emit(isIntersecting: boolean) {
  act(() => observerCallback?.([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver));
}

beforeEach(() => {
  observerCallback = null;
  vi.stubGlobal('IntersectionObserver', FakeObserver);
  (window as DataLayerWindow).dataLayer = [];
});

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = '';
});

function bar(container: HTMLElement) {
  return container.querySelector('[data-sticky-cta]') as HTMLElement;
}

describe('StickyMobileCTA', () => {
  it('fica oculta enquanto o CTA do hero está visível e aparece quando ele sai', () => {
    const hero = document.createElement('a');
    hero.setAttribute('data-hero-cta', '');
    document.body.appendChild(hero);
    const { container } = render(<StickyMobileCTA settings={siteSettings} />);
    emit(true);
    expect(bar(container)).not.toBeVisible();
    emit(false);
    expect(bar(container)).toBeVisible();
  });

  it('sem CTA de hero na página, aparece sempre', () => {
    const { container } = render(<StickyMobileCTA settings={siteSettings} />);
    expect(bar(container)).toBeVisible();
  });

  it('botões de 56px com os eventos certos e respeito à área segura', async () => {
    const { container } = render(<StickyMobileCTA settings={siteSettings} />);
    expect(bar(container).className).toContain('safe-area-inset-bottom');
    const whatsapp = screen.getByRole('link', { name: /WhatsApp/ });
    const agendar = screen.getByRole('link', { name: 'Agendar' });
    expect(whatsapp.className).toContain('min-h-14');
    expect(agendar.className).toContain('min-h-14');
    expect(agendar).toHaveAttribute('href', '/#agendar');
    for (const link of [whatsapp, agendar]) link.addEventListener('click', (e) => e.preventDefault());
    await userEvent.click(whatsapp);
    await userEvent.click(agendar);
    expect((window as DataLayerWindow).dataLayer).toEqual([
      { event: 'whatsapp_click', location: 'sticky_mobile' },
      { event: 'schedule_click', location: 'sticky_mobile' },
    ]);
  });
});
