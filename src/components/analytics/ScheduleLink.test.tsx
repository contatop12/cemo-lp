import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScheduleLink } from './ScheduleLink';

type DataLayerWindow = Window & { dataLayer?: unknown[] };

describe('ScheduleLink', () => {
  beforeEach(() => {
    (window as DataLayerWindow).dataLayer = [];
    Element.prototype.scrollIntoView = vi.fn();
  });

  it('com formulário na página: rola até ele, foca o primeiro campo e registra schedule_click', async () => {
    render(
      <div>
        <ScheduleLink location="teste">Agendar</ScheduleLink>
        <section id="agendar">
          <input aria-label="Nome" />
        </section>
      </div>,
    );
    await userEvent.click(screen.getByRole('link', { name: 'Agendar' }));
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    expect(screen.getByLabelText('Nome')).toHaveFocus();
    expect((window as DataLayerWindow).dataLayer).toEqual([{ event: 'schedule_click', location: 'teste' }]);
  });

  it('usa o formulário do fim da página quando não há outro', async () => {
    render(
      <div>
        <ScheduleLink location="teste">Agendar</ScheduleLink>
        <section id="agendar-final">
          <input aria-label="Nome final" />
        </section>
      </div>,
    );
    await userEvent.click(screen.getByRole('link', { name: 'Agendar' }));
    expect(screen.getByLabelText('Nome final')).toHaveFocus();
  });

  it('sem formulário: link normal para o formulário da Home', () => {
    render(<ScheduleLink location="teste">Agendar</ScheduleLink>);
    expect(screen.getByRole('link', { name: 'Agendar' })).toHaveAttribute('href', '/#agendar');
  });
});
