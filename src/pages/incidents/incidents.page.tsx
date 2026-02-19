import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

import { api } from '@/shared/api';
import type { TIncidentsListResponse } from '@/shared/api/types/types';

export const IncidentsPage = () => {
  const { data, isLoading, isError } = useQuery<TIncidentsListResponse | undefined>({
    queryKey: ['incidents'],
    queryFn: ({ signal }) => api.getIncidents({ signal }),
  });
  if (isError) return <div>Something went wrong</div>;

  return (
    <div>
      <h1>Incidents</h1>
      {isLoading || !data ? (
        <div>Loading…</div>
      ) : (
        <ul>
          {data.items.map((incident) => (
            <Link to={`/incidents/${incident.id}`} key={incident.id}>{incident.title}</Link>
          ))}
        </ul>
      )}
    </div>
  );
};
