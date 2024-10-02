import { RouteObject } from 'react-router';
import { AuthLayout, UnauthLayout } from '../../layouts';
import Home from '../../pages/home';
import {
  UserPage,
  NotesPage,
  NotesLayout,
  TrashPage,
} from '../../features/notes';
import { NotFoundPage } from '../components';

export const CLIENT_ROUTES: RouteObject[] = [
  {
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <NotesLayout />,
        children: [
          {
            path: 'notes',
            element: <NotesPage />,
          },
          {
            path: 'user',
            element: <UserPage />,
          },
          {
            path: 'trash',
            element: <TrashPage />,
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
