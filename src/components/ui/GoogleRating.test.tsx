import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { siteStats } from '@/content/fixtures/stats';
import { GoogleRating } from './GoogleRating';

type DataLayerWindow = Window & { dataLayer?: unknown[] };

describe('GoogleRating', () => {
  it('rótulo acessível montado a partir dos dados', () => {
    const { container } = render(<GoogleRating stats={siteStats} reviewsHref="https://g.page/x" />);
    const label = `Nota ${siteStats.googleRating.display} de 5 no Google, ${siteStats.googleRating.reviewsLabel}`;
    expect(screen.getByLabelText(label)).toBeInTheDocument();
    const stars = container.querySelectorAll('svg');
    expect(stars).toHaveLength(5);
    stars.forEach((s) => expect(s).toHaveAttribute('aria-hidden', 'true'));
  });

  it('link para as avaliações registra reviews_click', async () => {
    (window as DataLayerWindow).dataLayer = [];
    render(<GoogleRating stats={siteStats} reviewsHref="https://g.page/x" />);
    const link = screen.getByRole('link', { name: 'Ver avaliações no Google' });
    expect(link).toHaveAttribute('href', 'https://g.page/x');
    link.addEventListener('click', (e) => e.preventDefault());
    await userEvent.click(link);
    expect((window as DataLayerWindow).dataLayer).toEqual([{ event: 'reviews_click', location: 'rating' }]);
  });
});
