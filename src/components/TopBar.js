import styled from 'styled-components';

const StyledTopBar = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  border: 1px solid white;
`;

const StyledUserMenu = styled.div`
  display: flex;
  width: 15rem;
  margin-left: auto;
  background: #333333;
  border: 1px solid white;
`;

const StyledProfilePictureContainer = styled.div`
  width: 4rem;
  height: 100%;
  background: #666666;
  border-radius: 50%;
  border: 1px solid white;
`;

const StyledClickMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  margin-left: auto;
  background: #666666;
  border: 1px solid white;
  color: white;
`;

const HomeBar = styled.div`
  width: 15rem;
  height: 100%;
  border: 1px solid white;
  background: #222222;
`;

const ContextBar = styled(HomeBar)``;

const TopBar = () => {
  return (
    <StyledTopBar>
      <HomeBar />
      <ContextBar />
      <StyledUserMenu>
        <StyledProfilePictureContainer />
        <StyledClickMenu>Menu</StyledClickMenu>
      </StyledUserMenu>
    </StyledTopBar>
  );
};

export default TopBar;
