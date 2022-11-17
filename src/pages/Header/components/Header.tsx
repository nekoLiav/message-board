import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
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

export const Header = () => {
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
        <ProfileLink to={''}>
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
