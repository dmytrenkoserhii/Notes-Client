import { RouteObject } from 'react-router';
import { AuthLayout, UnauthLayout } from '../../layouts';
import Home from '../../pages/home';
import { NotesLayout } from '../../features/notes/layouts/notes-layout';
import { NotesPage } from '../../features/notes/pages/notes-page';
import { UserPage } from '../../features/notes/pages/user-page';

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
