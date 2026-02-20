import { Suspense } from 'react';
import { Outlet } from 'react-router';

import cls from './root-layout.module.scss';

export const RootLayout = () => {
  return (
    <div className={cls.root}>
      <header className={cls.header}>
        <div className={cls.headerContainer}>
          <div className={cls.brand}>Incident Inbox</div>
          <div className={cls.subtle}>Driver Operations</div>
        </div>
      </header>

      <main className={cls.container}>
        <Suspense fallback={<div>Loading…</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
