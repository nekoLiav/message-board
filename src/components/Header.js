import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SvgComponent from '../assets/logo.jsx';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: black;
  border: 1px solid grey;
`;

const HomeLink = styled(Link)`
  border: 1px solid grey;
`;

const Logo = styled(SvgComponent)`
  height: 100%;
  width: 100px;
  border: 1px solid grey;
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
