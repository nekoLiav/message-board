import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { LogoLink, Logo } from 'components/Logo';
import {
  HeaderContainer,
  LinkContainer,
  HeaderLink,
  HeaderText,
} from './style';

export const Header = () => {
  return (
    <HeaderContainer>
      <LinkContainer>
        <LogoLink to="/">
          <Logo />
        </LogoLink>
        <HeaderLink to="/">
          <FontAwesomeIcon
            className="header-icon"
            icon={solid('house')}
            fixedWidth
          />
          <HeaderText>Home</HeaderText>
        </HeaderLink>
        <HeaderLink to="/messages">
          <FontAwesomeIcon
            className="header-icon"
            icon={solid('envelope')}
            fixedWidth
          />
          <HeaderText>DMs</HeaderText>
        </HeaderLink>
        <HeaderLink to={'/gsatoru89'}>
          <FontAwesomeIcon
            className="header-icon"
            icon={solid('user')}
            fixedWidth
          />
          <HeaderText>Profile</HeaderText>
        </HeaderLink>
      </LinkContainer>
    </HeaderContainer>
  );
};
