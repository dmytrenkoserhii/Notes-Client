import React from 'react';
import { Outlet } from 'react-router';

export const UnauthLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
