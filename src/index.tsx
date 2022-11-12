import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles/meyer-reset.css';
import './styles/index.css';

import App from './components/views/App';
import Home from './components/views/Home';
import User from './components/views/User';
import PostView from './components/views/PostView';

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
        path: '/:handle',
        element: <User />,
      },
      {
        path: '/:handle/post/:post_id',
        element: <PostView />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<RouterProvider router={router} />);
