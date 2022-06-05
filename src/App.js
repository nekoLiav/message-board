import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function App() {
  return (
    <StyledApp>
      <Header />
      <Outlet />
    </StyledApp>
  );
}

export default App;
