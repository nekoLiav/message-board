import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles/meyer-reset.css';
import './styles/index.css';

import App from './views/App';
import Home from './views/Home';
import Messages from './views/Messages';
import Settings from './views/Settings';
import User from './views/User';
import Thread from './views/Thread';

import signIn from './functions/signIn';

const router = createBrowserRouter([
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
        path: '/settings',
        element: <Settings />,
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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<RouterProvider router={router} />);
