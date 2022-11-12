import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as Icon } from '../assets/logo2.svg';
import { Div } from '../styles/Div';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  height: 100%;

  @media (max-width: 360px) {
    display: none;
  }
`;

const LinkContainer = styled(Div)`
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
  margin: 0.5rem;
  gap: 0.5rem;

  @media (max-width: 650px) {
    margin: 0;
    padding: 0;
    align-self: center;
  }
`;

const LogoLink = styled(Link)`
  position: sticky;
  top: 0;
  max-height: 3rem;
  max-width: 3rem;
  margin: 0 0 1rem 0.25rem;

  @media (max-width: 650px) {
    margin: 0;
    padding: 0;
    align-self: center;
  }
`;

const Logo = styled(Icon)`
  display: flex;
  justify-content: center;
  max-height: 3rem;
  max-width: 3rem;
`;

const HomeLink = styled(Link)`
  display: flex;
  gap: 0.5rem;
  color: ${(props) => props.theme.fg};
  text-decoration: none;
  font-size: 1.25rem;
  border-radius: 15px;
  padding: 0.25rem;
  transition: 0.2s;

  &:hover {
    background: ${(props) => props.theme.main};
  }

  @media (max-width: 650px) {
    margin: 0;
    padding: 0;
    width: min-content;
    align-self: center;
  }
`;

const HomeLinkText = styled.p`
  @media (max-width: 650px) {
    display: none;
  }
`;

const MessagesLink = styled(Link)`
  display: flex;
  gap: 0.5rem;
  color: ${(props) => props.theme.fg};
  text-decoration: none;
  font-size: 1.25rem;
  border-radius: 15px;
  padding: 0.25rem;
  transition: 0.2s;

  &:hover {
    background: ${(props) => props.theme.main};
  }

  @media (max-width: 650px) {
    margin: 0;
    padding: 0;
    width: min-content;
    align-self: center;
  }
`;

const MessagesLinkText = styled.p`
  @media (max-width: 650px) {
    display: none;
  }
`;

const UserLink = styled(Link)`
  display: flex;
  gap: 0.5rem;
  color: ${(props) => props.theme.fg};
  text-decoration: none;
  font-size: 1.25rem;
  border-radius: 15px;
  padding: 0.25rem;
  transition: 0.2s;

  &:hover {
    background: ${(props) => props.theme.main};
  }

  @media (max-width: 650px) {
    margin: 0;
    padding: 0;
    width: min-content;
    align-self: center;
  }
`;

const UserLinkText = styled.p`
  @media (max-width: 650px) {
    display: none;
  }
`;

const GearLink = styled(Link)`
  display: flex;
  gap: 0.5rem;
  color: ${(props) => props.theme.fg};
  text-decoration: none;
  font-size: 1.25rem;
  border-radius: 15px;
  padding: 0.25rem;
  transition: 0.2s;

  &:hover {
    background: ${(props) => props.theme.main};
  }

  @media (max-width: 650px) {
    margin: 0;
    padding: 0;
    width: min-content;
    align-self: center;
  }
`;

const GearLinkText = styled.p`
  @media (max-width: 650px) {
    display: none;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <LinkContainer>
        <LogoLink to="/">
          <Logo />
        </LogoLink>
        <HomeLink to="/">
          <FontAwesomeIcon icon={solid('house')} fixedWidth />
          <HomeLinkText>Home</HomeLinkText>
        </HomeLink>
        <MessagesLink to="/">
          <FontAwesomeIcon icon={solid('envelope')} fixedWidth />
          <MessagesLinkText>DMs</MessagesLinkText>
        </MessagesLink>
        <UserLink to="/">
          <FontAwesomeIcon icon={solid('user')} fixedWidth />
          <UserLinkText>Profile</UserLinkText>
        </UserLink>
        <GearLink to="/">
          <FontAwesomeIcon icon={solid('gear')} fixedWidth />
          <GearLinkText>Settings</GearLinkText>
        </GearLink>
      </LinkContainer>
    </StyledHeader>
  );
};

export default Header;
