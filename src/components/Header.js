import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import SvgComponent from '../assets/logo.jsx';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: black;
`;

const Nav = styled.nav`
  display: flex;
  align-items: flex-end;
  height: min-content;
  width: 100%;
  background: black;
`;

const Container = styled.div`
  display: flex;
`;

const HomeLink = styled(Link)``;

const Logo = styled(SvgComponent)`
  height: 100%;
  width: 5rem;
`;

const Location = styled(Link)`
  color: white;
  height: min-content;
  text-decoration: none;
  justify-self: center;
  align-self: center;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Header = () => {
  const location = useLocation();
  const viewSring = () => {
    let string;
    if (!location.pathname.includes('comments')) {
      if (location.pathname.includes('n/')) {
        string = location.pathname.slice(3);
      } else {
        string = location.pathname.slice(1);
      }
      return string;
    }
  };

  return (
    <StyledHeader>
      <Nav></Nav>
      <Container>
        <HomeLink to="/">
          <Logo />
        </HomeLink>
        <Location to={`n/${viewSring()}`}>{viewSring()}</Location>
      </Container>
    </StyledHeader>
  );
};

export default Header;
