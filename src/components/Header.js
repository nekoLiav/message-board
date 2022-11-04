import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as Icon } from '../assets/logo.svg';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  background: black;
  align-items: flex-end;
  flex-grow: 1;
`;

const HomeLink = styled(Link)`
  position: sticky;
  top: 0;
  max-width: 100px;
  min-width: 50px;
`;

const Logo = styled(Icon)`
  width: 100%;
  height: 100%;
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
