import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #444444;
`;

const Nav = styled.nav`
  display: flex;
  align-items: flex-end;
  height: min-content;
  width: 100%;
  background: #666666;
`;

const NavItem = styled(Link)`
  color: white;
  height: min-content;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: flex-end;
`;

const HomeLink = styled(Link)`
  color: white;
  font-size: 2rem;
  text-decoration: none;
`;

const Location = styled(Link)`
  color: white;
  height: min-content;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Header = () => {
  const location = useLocation();
  const viewSring = () => {
    let string;
    if (location.pathname.includes('n/')) {
      string = location.pathname.slice(3);
    } else {
      string = location.pathname.slice(1);
    }
    return string;
  };

  return (
    <StyledHeader>
      <Nav>
        <NavItem to="/">home</NavItem>&nbsp;
        <NavItem to={'n/all'}>all</NavItem>
        &nbsp;
      </Nav>
      <Container>
        <HomeLink to="/">nublet</HomeLink>&nbsp;
        <Location to={`n/${viewSring()}`}>{viewSring()}</Location>
      </Container>
    </StyledHeader>
  );
};

export default Header;
