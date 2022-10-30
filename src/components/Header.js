import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SvgComponent from '../assets/logo.jsx';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: black;
  align-items: flex-end;
`;

const HomeLink = styled(Link)`
  width: 100px;
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
