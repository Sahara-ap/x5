import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';

import { api } from '@/shared/api';
import type { TIncidentsListResponse } from '@/shared/api/types/types';
import { useQueryParams } from '@/shared/hooks/use-query-params';
import { Dropdown } from '@/shared/ui/dropdown/dropdown';
import { debounce } from '@/shared/utils/debounce';
import { parsePositiveInteger } from '@/shared/utils/parse-positive-integer';

import { priorityOptions, sortOptions, statusOptions } from './consts/incidents.consts';
import { isPriorityType, isSortType, isStatusType } from './model/guards';
import { Pagination } from './ui/pagination';

export const IncidentsPage = () => {
  const { params, updateParams } = useQueryParams();
  const [queryInputValue, setQueryInputValue] = useState(params.query || '');

  const query = params.query;
  const status = params.status;
  const priority = params.priority;
  const sort = params.sort ?? 'newest';
  const page = parsePositiveInteger(params.page, '1');
  const limit = parsePositiveInteger(params.limit, '10');

  const incidentsQueryParameters = {
    query,
    status,
    priority,
    sort,
    page,
    limit,
  };

  const { data, isLoading, isError } = useQuery<TIncidentsListResponse | undefined>({
    queryKey: ['incidents', incidentsQueryParameters],
    queryFn: ({ signal }) => api.getIncidents(incidentsQueryParameters, { signal }),
  });

  const debouncedUpdateParams = useMemo(
    () =>
      debounce((value: string) => {
        updateParams({
          query: value,
          page: '1', // при изменении фильтров/поиска сбрасыва страницу
        });
      }, 400),
    [updateParams]
  );

  const handleQueryChange = (value: string) => {
    setQueryInputValue(value);
    debouncedUpdateParams(value);
  };

  const handleStatusChange = (value: string) => {
    if (isStatusType(value)) {
      updateParams({
        status: value === 'allStatus' ? undefined : value,
        page: '1',
      });
    }
  };

  const handlePriorityChange = (value: string) => {
    if (isPriorityType(value)) {
      updateParams({
        priority: value === 'allPriorities' ? undefined : value,
        page: '1',
      });
    }
  };

  const handleSortChange = (value: string) => {
    if (isSortType(value)) {
      updateParams({
        sort: value || 'newest',
        page: '1',
      });
    }
  };

  const handlePrevPagination = () => {
    if (!data) return;
    updateParams({
      page: String(data.page - 1),
    });
  };
  const handleNextPagination = () => {
    if (!data) return;
    updateParams({
      page: String(data.page + 1),
    });
  };

  //синхронизация input с Back/Next history
  useEffect(() => {
    const queryFromUrl = params.query || '';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQueryInputValue(queryFromUrl);
  }, [params.query]);

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <h1>Incidents</h1>

      <div style={{ display: 'grid', gap: 8, maxWidth: 520 }}>
        <label>
          Search
          <input
            value={queryInputValue}
            onChange={(event) => handleQueryChange(event.target.value)}
            placeholder="Search by title/description/id"
          />
        </label>

        <label>
          Status
          <Dropdown
            items={statusOptions}
            initialOption={statusOptions[0]}
            onChange={(option) => handleStatusChange(option.value)}
          />
        </label>

        <label>
          Priority
          <Dropdown
            items={priorityOptions}
            initialOption={priorityOptions[0]}
            onChange={(option) => handlePriorityChange(option.value)}
          />
        </label>

        <label>
          Sort
          <Dropdown
            items={sortOptions}
            initialOption={sortOptions[0]}
            onChange={(option) => handleSortChange(option.value)}
          />
        </label>
      </div>

      {isLoading || !data ? (
        <div>Loading…</div>
      ) : data.items.length === 0 ? (
        <div>No incidents found</div>
      ) : (
        <ul>
          {data.items.map((incident) => (
            <li key={incident.id}>
              <Link to={`/incidents/${incident.id}`}>{incident.title}</Link>
            </li>
          ))}
        </ul>
      )}

      {!isLoading && data && data.totalPages > 1 && (
        <Pagination
          data={data}
          onPrevPagination={handlePrevPagination}
          onNextPagination={handleNextPagination}
        />
      )}
    </div>
  );
};
