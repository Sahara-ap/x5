import type { TIncidentsListResponse } from '@/shared/api/types/types';

interface IPaginationProps {
  data: TIncidentsListResponse;
  onNextPagination: () => void;
  onPrevPagination: () => void;
}
export const Pagination = ({
  data,
  onPrevPagination,
  onNextPagination,
}: IPaginationProps) => {
  return (
    <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
      <button disabled={data.page <= 1} onClick={onPrevPagination}>
        Prev
      </button>

      <span>
        Page {data.page} of {data.totalPages}
      </span>

      <button disabled={data.page >= data.totalPages} onClick={onNextPagination}>
        Next
      </button>
    </div>
  );
};
