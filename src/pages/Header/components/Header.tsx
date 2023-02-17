import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { LogoLink, Logo } from 'components/Logo';
import {
  HeaderContainer,
  LinkContainer,
  HeaderLink,
  HeaderText,
} from './style';
import { useHeader } from '../hooks/useHeader';
import { Loading } from 'pages/Loading';
import { ErrorDisplay } from 'pages/ErrorDisplay';
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from 'api/helpers/errorTypes';

export const Header = () => {
  const HeaderData = useHeader();

  const {
    loggedIn,
    loggedInUserData,
    loggedInUserDataError,
    loggedInUserDataIsLoading,
  } = HeaderData;

  if (loggedInUserDataIsLoading) {
    return <Loading />;
  }

  if (loggedInUserDataError) {
    if (isFetchBaseQueryError(loggedInUserDataError)) {
      const errMsg = JSON.stringify(loggedInUserDataError.data);
      return <ErrorDisplay loadingError={errMsg} />;
    }
    if (isErrorWithMessage(loggedInUserDataError)) {
      return <ErrorDisplay loadingError={loggedInUserDataError.message} />;
    }
  }

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
        {loggedIn && (
          <HeaderLink to="/messages">
            <FontAwesomeIcon
              className="header-icon"
              icon={solid('envelope')}
              fixedWidth
            />

            <HeaderText>DMs</HeaderText>
          </HeaderLink>
        )}
        {loggedIn && loggedInUserData && (
          <HeaderLink to={`${loggedInUserData.handle}`}>
            <FontAwesomeIcon
              className="header-icon"
              icon={solid('user')}
              fixedWidth
            />
            <HeaderText>Profile</HeaderText>
          </HeaderLink>
        )}
      </LinkContainer>
    </HeaderContainer>
  );
};
