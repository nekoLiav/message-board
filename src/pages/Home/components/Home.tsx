import { Content } from 'features/Content';
import { ContentSubmission } from 'features/ContentSubmission';
import { ErrorDisplay } from 'pages/ErrorDisplay';
import { Loading } from 'pages/Loading';
import { useHomePostsQuery, useValidatedUserDataQuery } from 'api';
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from 'api/helpers/errorTypes';

export const Home = () => {
  const {
    data: homePosts,
    error: homePostsError,
    isLoading: homePostsIsLoading,
  } = useHomePostsQuery();
  const {
    data: currentUser,
    error: userDataError,
    isLoading: userDataIsLoading,
  } = useValidatedUserDataQuery();

  if (userDataIsLoading) {
    return <Loading />;
  }

  if (homePostsIsLoading) {
    return <Loading />;
  }

  if (userDataError) {
    if (isFetchBaseQueryError(userDataError)) {
      const errMsg = JSON.stringify(userDataError.data);
      return <ErrorDisplay loadingError={errMsg} />;
    }
    if (isErrorWithMessage(userDataError)) {
      return <ErrorDisplay loadingError={userDataError.message} />;
    }
  }

  if (homePostsError) {
    if (isFetchBaseQueryError(homePostsError)) {
      const errMsg = JSON.stringify(homePostsError.data);
      return <ErrorDisplay loadingError={errMsg} />;
    }
    if (isErrorWithMessage(homePostsError)) {
      return <ErrorDisplay loadingError={homePostsError.message} />;
    }
  }

  return (
    <div>
      {currentUser && <ContentSubmission currentUser={currentUser} />}
      {homePosts &&
        homePosts.map((post) => <Content key={post.post_id} content={post} />)}
    </div>
  );
};
