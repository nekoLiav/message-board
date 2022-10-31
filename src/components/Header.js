import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SvgComponent from '../assets/logo.jsx';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  background: black;
  align-items: flex-end;
  flex-grow: 1;
`;

const HomeLink = styled(Link)`
  width: 100px;
  position: sticky;
  top: 0;
`;

const Logo = styled(SvgComponent)`
  height: 100%;
  width: 100%;
`;

const Header = () => {
  return (
    <StyledHeader>
      <HomeLink to="/">
        <Logo />
      </HomeLink>
    </StyledHeader>
  );
};

export default Header;
