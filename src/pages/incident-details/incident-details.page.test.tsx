import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createTestRoutes } from '@/shared/test-utils/create-route';
import { renderWithProviders } from '@/shared/test-utils/render-with-provider';

describe('routing', () => {
  it('navigates from IncedentPage list to details', async () => {
    renderWithProviders({
      entryRoute: '/incidents',
      routes: createTestRoutes(),
    });

    const link = await screen.findByRole('link', { name: /Damaged/i });

    await userEvent.click(link);

    expect(await screen.findByText(/Status/i)).toBeInTheDocument();
  });
});
