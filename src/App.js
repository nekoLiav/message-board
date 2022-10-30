import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './components/views/Home';

const StyledApp = styled.div`
  height: 100%;
`;

function App() {
  return (
    <StyledApp>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
      </Routes>
    </StyledApp>
  );
}

export default App;
