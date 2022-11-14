import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './views/App/App';
import Loading from './components/Loading/Loading';
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
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
        index: true,
      },
      {
        path: '/home',
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/messages',
        element: (
          <Suspense fallback={<Loading />}>
            <Messages />
          </Suspense>
        ),
      },
      {
        path: '/:handle',
        element: (
          <Suspense fallback={<Loading />}>
            <User />
          </Suspense>
        ),
      },
      {
        path: '/:handle/post/:post_id',
        element: (
          <Suspense fallback={<Loading />}>
            <Thread />
          </Suspense>
        ),
      },
    ],
  },
]);
