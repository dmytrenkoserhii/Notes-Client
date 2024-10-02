import { RouteObject } from 'react-router';
import { AuthLayout, UnauthLayout } from '../../layouts';
import Home from '../../pages/home';
import { UserPage, NotesPage, NotesLayout } from '../../features/notes';

export const CLIENT_ROUTES: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        element: <NotesLayout />,
        children: [
          {
            path: '/notes',
            element: <NotesPage />,
          },
          {
            path: 'user',
            element: <UserPage />,
          },
        ],
      },
    ],
  },
  {
    element: <UnauthLayout />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
    ],
  },
];
