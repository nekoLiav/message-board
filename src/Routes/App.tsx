import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Aside from '../Aside/Aside';

const StyledApp = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr minmax(min-content, 600px) 1fr;
  height: 100%;
  width: 100%;
`;

const App = () => {
  return (
    <StyledApp>
      <Header />
      <Outlet />
      <Aside />
    </StyledApp>
  );
};

export default App;
