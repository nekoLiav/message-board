import { useState } from 'react';
import { Profile } from './Profile';
import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
import { Loading } from 'pages/Loading';
import { ErrorDisplay } from 'pages/ErrorDisplay';
import { useValidatedUserDataQuery } from 'api';
import { useUserProfileQuery } from 'api';
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from 'api/helpers/errorTypes';
import { useParams } from 'react-router-dom';

export const UserProfile = () => {
  const [messageToggle, setMessageToggle] = useState(false);

  const params = useParams();

  const {
    data: currentUser,
    error: currentUserDataError,
    isLoading: currentUserDataIsLoading,
  } = useValidatedUserDataQuery();

  const {
    data,
    error: userProfileDataError,
    isLoading: userProfileDataIsLoading,
  } = useUserProfileQuery(params.handle);

  const toggleDM = () => {
    setMessageToggle(!messageToggle);
  };

  if (currentUserDataIsLoading) {
    return <Loading />;
  }

  if (currentUserDataError) {
    if (isFetchBaseQueryError(currentUserDataError)) {
      const errMsg = JSON.stringify(currentUserDataError.data);
      return <ErrorDisplay loadingError={errMsg} />;
    }
    if (isErrorWithMessage(currentUserDataError)) {
      return <ErrorDisplay loadingError={currentUserDataError.message} />;
    }
  }

  if (userProfileDataIsLoading || !data) {
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

  const { user, userPosts } = data;

  return (
    <div>
      {user && <Profile user={user} toggleDM={toggleDM} />}
      {messageToggle && currentUser && user && (
        <ContentSubmission currentUser={currentUser} recipient={user.id} />
      )}
      {userPosts &&
        userPosts.map((post) => <Content key={post.post_id} content={post} />)}
    </div>
  );
};
