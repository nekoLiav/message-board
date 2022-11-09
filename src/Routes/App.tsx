import styled, { ThemeProvider } from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import dark from '../Themes/Dark';
import { Div } from '../Styles/Div';

const StyledApp = styled(Div)`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr minmax(min-content, 600px) 1fr;
  height: 100%;
  width: 100%;
`;

const App = () => {
  return (
    <ThemeProvider theme={dark}>
      <StyledApp>
        <Header />
        <Outlet />
        <Aside />
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
