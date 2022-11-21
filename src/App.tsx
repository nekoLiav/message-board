import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Loading } from 'pages/Loading';
import { MainLayout } from 'components/Layouts';

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export default App;
