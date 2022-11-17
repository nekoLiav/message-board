import { useRouteLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { isUser } from 'functions/assertUnknowns';
import {
  HeaderContainer,
  LinkContainer,
  LogoLink,
  Logo,
  HomeLink,
  HomeLinkText,
  MessagesLink,
  MessagesLinkText,
  ProfileLink,
  ProfileLinkText,
} from './style';

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
