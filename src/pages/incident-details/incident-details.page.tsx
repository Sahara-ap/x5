import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { getIncidentDetails } from '@/shared/api/api';

export const IncidentDetailsPage = () => {
  const params = useParams();
  const incidentId = params.id;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['incident', incidentId],
    queryFn: () => getIncidentDetails(incidentId!),
    enabled: Boolean(incidentId),
  });

  if (isLoading || !data) return <div>Loading details…</div>;

  if (isError) {
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return <div>Not found</div>;
    }
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <h1>{data.incident.title}</h1>
      <p>{data.incident.description}</p>

      <div>
        <div>Status: {data.incident.status}</div>
        <div>Priority: {data.incident.priority}</div>
        <div>Reporter: {data.incident.reporter}</div>
      </div>

      <h2>Notes</h2>
      {data.notes.length ? (
        <ul>
          {data.notes.map((note) => (
            <li key={note.id}>{note.message}</li>
          ))}
        </ul>
      ) : (
        <div>No notes</div>
      )}
    </div>
  );
};
