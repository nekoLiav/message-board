import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { ErrorDisplay } from 'pages/ErrorDisplay';
import App from 'App';

const Home = lazy(() => import('pages/Home'));
const UserProfile = lazy(() => import('pages/UserProfile'));
const Messages = lazy(() => import('pages/Messages'));
const MessageThread = lazy(() => import('pages/MessageThread'));
const PostThread = lazy(() => import('pages/PostThread'));

import { userProfileLoader } from 'api/loaders/userProfileLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    id: 'app',
    errorElement: <ErrorDisplay />,
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
        element: <UserProfile />,
        loader: ({ params }) => {
          if (params.handle) {
            return userProfileLoader(params.handle);
          }
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
      },
    ],
  },
]);
