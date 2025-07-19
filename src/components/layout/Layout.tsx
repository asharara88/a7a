import React from 'react';
import { Outlet } from 'react-router-dom';
import MinimalNav from './MinimalNav';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MinimalNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;