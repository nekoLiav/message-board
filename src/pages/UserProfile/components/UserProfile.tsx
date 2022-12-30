import { useState } from 'react';
import { Profile } from './Profile';
import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
import { Loading } from 'pages/Loading';
import { ErrorDisplay } from 'pages/ErrorDisplay';
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from 'api/helpers/errorTypes';
import { useUserProfile } from '../hooks/useUserProfile';

export const UserProfile = () => {
  const [messageToggle, setMessageToggle] = useState(false);
  const {
    loggedInUserData,
    loggedInUserDataError,
    loggedInUserDataIsLoading,
    userProfileData,
    userProfileDataError,
    userProfileDataIsLoading,
  } = useUserProfile();

  const toggleDM = () => {
    setMessageToggle(!messageToggle);
  };

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

  if (userProfileDataIsLoading || !userProfileData) {
    return <Loading />;
  }

  if (userProfileDataError) {
    if (isFetchBaseQueryError(userProfileDataError)) {
      const errMsg = JSON.stringify(userProfileDataError.data);
      return <ErrorDisplay loadingError={errMsg} />;
    }
    if (isErrorWithMessage(userProfileDataError)) {
      return <ErrorDisplay loadingError={userProfileDataError.message} />;
    }
  }

  const { user, userPosts } = userProfileData;

  return (
    <div>
      {user && <Profile user={user} toggleDM={toggleDM} />}
      {messageToggle && loggedInUserData && user && (
        <ContentSubmission
          loggedInUser={loggedInUserData}
          recipient={user.id}
        />
      )}
      {userPosts &&
        userPosts.map((post) => <Content key={post.post_id} content={post} />)}
    </div>
  );
};
