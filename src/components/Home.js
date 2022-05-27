import styled from 'styled-components';
import Topics from './Topics';

const StyledHome = styled.div`
  display: flex;
  height: 100%;
  border: 1px solid white;
`;

const Home = () => {
  return (
    <StyledHome>
      <Topics />
    </StyledHome>
  );
};

export default Home;
