import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SvgComponent from '../assets/logo.jsx';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  background: black;
  align-items: flex-end;
  border: 1px solid grey;
  flex-grow: 1;
`;

const HomeLink = styled(Link)`
  border: 1px solid grey;
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
