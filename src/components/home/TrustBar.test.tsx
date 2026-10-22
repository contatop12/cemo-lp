import { render, screen, within } from '@testing-library/react';
import { siteStats } from '@/content/fixtures/stats';
import { TrustBar } from './TrustBar';

describe('TrustBar', () => {
  it('mostra as provas a partir das props, em lista', () => {
    render(<TrustBar stats={siteStats} doctorsCount={8} />);
    const list = screen.getByRole('list');
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(4);
    for (const value of [
      siteStats.googleRating.display,
      siteStats.yearsOfActivity.display,
      siteStats.patientsServed.display,
      '8',
    ]) {
      expect(within(list).getByText(value)).toBeInTheDocument();
    }
  });

  it('números em Literata (font-display)', () => {
    render(<TrustBar stats={siteStats} doctorsCount={8} />);
    expect(screen.getByText(siteStats.yearsOfActivity.display).className).toContain('font-display');
  });
});
