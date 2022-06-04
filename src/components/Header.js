import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

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
  const params = useParams();

  return (
    <StyledHeader>
      <Nav>
        <NavItem to="/">home</NavItem>&nbsp;
      </Nav>
      <Container>
        <HomeLink to="/">nublet</HomeLink>&nbsp;
        <Location to={`n/${params.subnub}`}>{params.subnub}</Location>
      </Container>
    </StyledHeader>
  );
};

export default Header;
