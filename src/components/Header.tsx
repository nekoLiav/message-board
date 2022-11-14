import styled from 'styled-components';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { ReactComponent as Icon } from '../assets/logo3.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { isUser } from '../functions/assertUnknowns';
import { HeaderContainer, LinkContainer } from './Containers';

const LogoLink = styled(Link)`
  position: sticky;
  top: 0;
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 650px) {
    width: 1.5rem;
    height: 1.5rem;
    align-self: center;
  }

  @media (max-width: 360px) {
    flex-direction: row;
    margin: 0;
    margin-right: auto;
  }
`;

const Logo = styled(Icon)``;

const HomeLink = styled(Link)`
  display: flex;
  gap: 0.5rem;
  color: ${(props) => props.theme.primary};
  text-decoration: none;
  font-size: 1.25rem;
  border-radius: 15px;
  padding: 0.5rem;
  transition: 0.2s;
  align-items: baseline;

  &:hover {
    background: ${(props) => props.theme.mo};
  }

  &:active {
    background: ${(props) => props.theme.mo2};
  }

  @media (max-width: 650px) {
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
  color: ${(props) => props.theme.primary};
  text-decoration: none;
  font-size: 1.25rem;
  border-radius: 15px;
  padding: 0.5rem;
  transition: 0.2s;
  align-items: baseline;

  &:hover {
    background: ${(props) => props.theme.mo};
  }

  &:active {
    background: ${(props) => props.theme.mo2};
  }

  @media (max-width: 650px) {
    width: min-content;
    align-self: center;
  }
`;

const MessagesLinkText = styled.p`
  @media (max-width: 650px) {
    display: none;
  }
`;

const ProfileLink = styled(Link)`
  display: flex;
  gap: 0.5rem;
  color: ${(props) => props.theme.primary};
  text-decoration: none;
  font-size: 1.25rem;
  border-radius: 15px;
  padding: 0.5rem;
  transition: 0.2s;
  align-items: baseline;

  &:hover {
    background: ${(props) => props.theme.mo};
  }

  &:active {
    background: ${(props) => props.theme.mo2};
  }

  @media (max-width: 650px) {
    width: min-content;
    align-self: center;
  }
`;

const ProfileLinkText = styled.p`
  @media (max-width: 650px) {
    display: none;
  }
`;

const Header = () => {
  const currentUser = isUser(useRouteLoaderData('app'));
  const { handle } = currentUser;

  return (
    <HeaderContainer>
      <LinkContainer>
        <LogoLink to="/">
          <Logo />
        </LogoLink>
        <HomeLink to="/">
          <FontAwesomeIcon
            className="header-icon"
            icon={solid('house')}
            fixedWidth
          />
          <HomeLinkText>Home</HomeLinkText>
        </HomeLink>
        <MessagesLink to="/messages">
          <FontAwesomeIcon
            className="header-icon"
            icon={solid('envelope')}
            fixedWidth
          />
          <MessagesLinkText>DMs</MessagesLinkText>
        </MessagesLink>
        <ProfileLink to={handle}>
          <FontAwesomeIcon
            className="header-icon"
            icon={solid('user')}
            fixedWidth
          />
          <ProfileLinkText>Profile</ProfileLinkText>
        </ProfileLink>
      </LinkContainer>
    </HeaderContainer>
  );
};

export default Header;
