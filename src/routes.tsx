import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './views/App/App';
import signIn from './functions/signIn';

const Home = lazy(() => import('./views/Home'));
const Messages = lazy(() => import('./views/Messages'));
const User = lazy(() => import('./views/User'));
const Thread = lazy(() => import('./views/Thread'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    id: 'app',
    loader: async () => {
      const clientUser = await signIn;
      return clientUser;
    },
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/messages',
        element: <Messages />,
      },
      {
        path: '/messages/:message_id',
        element: <Thread />,
      },
      {
        path: '/:handle',
        element: <User />,
      },
      {
        path: '/:handle/post/:post_id',
        element: <Thread />,
      },
    ],
  },
]);
