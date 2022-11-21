import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { ErrorDisplay } from 'pages/ErrorDisplay';
import App from 'App';

const Home = lazy(() => import('pages/Home'));
const UserProfile = lazy(() => import('pages/UserProfile'));
const Messages = lazy(() => import('pages/Messages'));
const MessageThread = lazy(() => import('pages/MessageThread'));
const PostThread = lazy(() => import('pages/PostThread'));

import { homeLoader } from 'api/loaders/homeLoader';
import { userProfileLoader } from 'api/loaders/userProfileLoader';
import { messagesLoader } from 'api/loaders/messagesLoader';
import { messageThreadLoader } from 'api/loaders/messageThreadLoader';
import { postThreadLoader } from 'api/loaders/postThreadLoader';

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
        loader: () => homeLoader(),
      },
      {
        path: '/home',
        element: <Home />,
        loader: () => homeLoader(),
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
        loader: () => messagesLoader(),
      },
      {
        path: '/messages/:message_id',
        element: <MessageThread />,
        loader: ({ params }) => {
          if (params.message_id) {
            return messageThreadLoader(params.message_id);
          }
        },
      },
      {
        path: '/:handle/post/:post_id',
        element: <PostThread />,
        loader: ({ params }) => {
          if (params.post_id) {
            return postThreadLoader(params.post_id);
          }
        },
      },
    ],
  },
]);
