import { RouteObject } from 'react-router';
import { AuthLayout, UnauthLayout } from '../../layouts';
import Home from '../../pages/home';

export const CLIENT_ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/auth',
    element: <UnauthLayout />,
    children: [],
  },
];
