import TopBar from './components/TopBar';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function App() {
  return (
    <StyledApp>
      <TopBar />
      <Outlet />
    </StyledApp>
  );
}

export default App;
