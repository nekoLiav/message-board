import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles/meyer-reset.css';
import './styles/index.css';

import App from './Routes/App';
import Home from './Routes/Home';
import User from './Routes/User';
import PostView from './Routes/PostView';

import signIn from './Helpers/signIn';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    id: 'app',
    loader: async () => {
      const user = await signIn;
      return user;
    },
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: ':user_id',
        element: <User />,
      },
      {
        path: ':user_id/post/:post_id',
        element: <PostView />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
