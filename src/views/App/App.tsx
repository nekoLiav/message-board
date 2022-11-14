import { ThemeProvider } from 'styled-components';
import { Outlet } from 'react-router-dom';
import dark from '../../themes/Dark';
import Header from '../../components/Header/Header';
import Aside from '../../components/Sidebar/Sidebar';
import { AppContainer, RouteContainer } from './style';

const App = () => {
  return (
    <ThemeProvider theme={dark}>
      <AppContainer>
        <Header />
        <RouteContainer>
          <Outlet />
        </RouteContainer>
        <Aside />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
