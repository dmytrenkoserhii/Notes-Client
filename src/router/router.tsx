import { createHashRouter } from 'react-router-dom';
import { CLIENT_ROUTES } from './routes';

export const router = createHashRouter(CLIENT_ROUTES);
