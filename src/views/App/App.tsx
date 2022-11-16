import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Aside from '../../components/Sidebar/Sidebar';
import { AppContainer, RouteContainer } from './style';
import Loading from '../../components/Loading/Loading';
import { Suspense } from 'react';

const App = () => {
  return (
    <AppContainer>
      <Header />
      <RouteContainer>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </RouteContainer>
      <Aside />
    </AppContainer>
  );
};

export default App;
