import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from 'App';
import signIn from 'functions/signIn';

const Home = lazy(() => import('pages/Home'));
const User = lazy(() => import('features/User'));
const Messages = lazy(() => import('pages/Messages'));
const MessageThread = lazy(() => import('pages/MessageThread'));
const PostThread = lazy(() => import('pages/PostThread'));

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
        path: '/:handle',
        element: <User />,
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
