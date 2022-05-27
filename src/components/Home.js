import styled from 'styled-components';
import All from './All';

const StyledHome = styled.div`
  display: flex;
  height: 100%;
  border: 1px solid white;
`;

const Home = () => {
  return (
    <StyledHome>
      <All />
    </StyledHome>
  );
};

export default Home;
