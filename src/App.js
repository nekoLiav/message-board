import TopBar from './components/TopBar';
import styled from 'styled-components';
import Home from './components/Home';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function App() {
  return (
    <StyledApp>
      <TopBar />
      <Home />
    </StyledApp>
  );
}

export default App;
