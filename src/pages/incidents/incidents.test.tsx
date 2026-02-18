import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/shared/test-utils/render-with-provider';

import { IncidentsPage } from './incidents.page';

describe('IncidentsPage (MSW)', () => {
  it('renders loading then incidents list', async () => {
    renderWithProviders({
      entryRoute: '/incidents',
      routes: [{ path: '/incidents', element: <IncidentsPage /> }],
    });

    // 1) проверяю, что сначала есть лоадер
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    // 2) затем жду реальные данные (из MSW)
    expect(await screen.findByText(/Damaged package/i)).toBeInTheDocument();
    expect(await screen.findByText(/Wrong address/i)).toBeInTheDocument();
    expect(await screen.findByText(/Delivery delayed/i)).toBeInTheDocument();
  });
});
