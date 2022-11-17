import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'providers/QueryProvider';
import { Loading } from 'pages/Loading';
import { MainLayout } from 'components/Layouts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </MainLayout>
      <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />
    </QueryClientProvider>
  );
};

export default App;
