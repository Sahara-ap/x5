import { apiInstance as api } from './api-instance';

type TIncidentsListResponse = {
  items: { id: string; title: string }[];
};

export const getIncidents = async (options?: {
  signal?: AbortSignal;
}): Promise<TIncidentsListResponse> => {
  const { data } = await api.get<TIncidentsListResponse>('incidents', { signal: options?.signal });
  return data;
};
