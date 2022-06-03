import styled from 'styled-components';

const StyledUserPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15rem;
  margin-left: auto;
  background: #444444;
  border: 1px solid white;
`;

const UserMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  background: #222222;
  border: 1px solid white;
  color: white;
`;

const UserPanel = () => {
  return (
    <StyledUserPanel>
      <UserMenu>Menu</UserMenu>
    </StyledUserPanel>
  );
};

export default UserPanel;
