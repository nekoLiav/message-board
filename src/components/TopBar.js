import styled from 'styled-components';
import UserPanel from './UserPanel';

const StyledTopBar = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  border: 1px solid white;
  background: #444444;
`;

const HomeBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 100%;
  border: 1px solid white;
  background: #222222;
`;

const HomeText = styled.p`
  color: white;
  font-size: 2rem;
`;

const TopBar = () => {
  return (
    <StyledTopBar>
      <HomeBar>
        <HomeText>nublet</HomeText>
      </HomeBar>
      <UserPanel />
    </StyledTopBar>
  );
};

export default TopBar;
