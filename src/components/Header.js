import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  background: #444444;
`;

const StyledHomeLink = styled(Link)`
  color: white;
  font-size: 2rem;
  text-decoration: none;
  background: #222222;
  width: 7rem;
  padding: 0.2rem;
  text-align: center;
`;

const StyledSubnubList = styled.ul`
  display: flex;
  align-items: flex-end;
  background: #222222;
  height: min-content;
  width: 100%;
`;

const StyledSubnubListItem = styled.li`
  color: white;
  height: min-content;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StyledUserPanel = styled.div`
  display: flex;
  margin-left: auto;
  background: #444444;
  height: 100%;
`;

const UserMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  width: 7rem;
  padding: 0.2rem;
  background: #222222;
  font-size: 1rem;
  color: white;
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledHomeLink to="/">nublet</StyledHomeLink>
      <StyledSubnubList>
        <StyledSubnubListItem>home</StyledSubnubListItem>&nbsp;
      </StyledSubnubList>
      <StyledUserPanel>
        <UserMenu>Menu</UserMenu>
      </StyledUserPanel>
    </StyledHeader>
  );
};

export default Header;
