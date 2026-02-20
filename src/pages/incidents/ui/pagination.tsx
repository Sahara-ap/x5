import type { TIncidentsListResponse } from '@/shared/api/types/types';

import cls from './pagination.module.scss';

interface IPaginationProps {
  data: TIncidentsListResponse;
  onNextPagination: () => void;
  onPrevPagination: () => void;
}
export const Pagination = ({ data, onPrevPagination, onNextPagination }: IPaginationProps) => {
  return (
    <div className={cls.root}>
      <button className={cls.button} disabled={data.page <= 1} onClick={onPrevPagination}>
        Prev
      </button>

      <span className={cls.text}>
        Page {data.page} of {data.totalPages}
      </span>

      <button
        className={cls.button}
        disabled={data.page >= data.totalPages}
        onClick={onNextPagination}
      >
        Next
      </button>
    </div>
  );
};
