import { RouteObject } from 'react-router';
import { AuthLayout, UnauthLayout } from '../../layouts';

export const CLIENT_ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <AuthLayout />,
    children: [],
  },
  {
    path: '/auth',
    element: <UnauthLayout />,
    children: [],
  },
];
