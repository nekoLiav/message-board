import { createBrowserRouter } from 'react-router-dom';
import App from './views/App/App';
import Home from './views/Home';
import Messages from './views/Messages';
import User from './views/User';
import Thread from './views/Thread';

import signIn from './functions/signIn';

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
