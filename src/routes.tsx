import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from 'App';

const Home = lazy(() => import('pages/Home'));
const User = lazy(() => import('pages/User'));
const Messages = lazy(() => import('pages/Messages'));
const MessageThread = lazy(() => import('pages/MessageThread'));
const PostThread = lazy(() => import('pages/PostThread'));

import authLoader from 'loaders/authLoader';
import homeLoader from 'pages/Home/loaders/homeLoader';
import postThreadLoader from 'pages/PostThread/loaders/postThreadLoader';
import userProfileLoader from 'pages/User/loaders/userProfileLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    id: 'app',
    loader: () => authLoader,
    children: [
      {
        element: <Home />,
        index: true,
        loader: () => homeLoader(),
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/:handle',
        element: <User />,
        loader: ({ params }) => {
          if (params.handle) {
            return userProfileLoader(params.handle);
          }
          return undefined;
        },
      },
      {
        path: '/messages',
        element: <Messages />,
      },
      {
        path: '/messages/:message_id',
        element: <MessageThread />,
      },
      {
        path: '/:handle/post/:post_id',
        element: <PostThread />,
        loader: ({ params }) => {
          if (params.post_id) {
            return postThreadLoader(params.post_id);
          }
          return undefined;
        },
      },
    ],
  },
]);
