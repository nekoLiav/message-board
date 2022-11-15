import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../..';
import { Outlet } from 'react-router-dom';
import dark from '../../themes/Dark';
import Header from '../../components/Header/Header';
import Aside from '../../components/Sidebar/Sidebar';
import { AppContainer, RouteContainer } from './style';
import Loading from '../../components/Loading/Loading';
import { Suspense } from 'react';

const App = () => {
  return (
    <ThemeProvider theme={dark}>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <RouteContainer>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </RouteContainer>
        <Aside />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
