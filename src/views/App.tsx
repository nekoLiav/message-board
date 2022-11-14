import { ThemeProvider } from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Aside from '../components/Aside';
import dark from '../themes/Dark';
import { AppContainer, RouteContainer } from '../components/Containers';

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
