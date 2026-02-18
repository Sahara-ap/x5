import { createBrowserRouter, Navigate } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/incidents" replace />,
  },
  {
    path: '/incidents',
    lazy: () =>
      import('@/pages/incidents/incidents.page').then((module) => ({
        Component: module.IncidentsPage,
      })),
  },
]);
