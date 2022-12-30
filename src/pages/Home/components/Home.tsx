import { Content } from 'features/Content';
import { ContentSubmission } from 'features/ContentSubmission';
import { ErrorDisplay } from 'pages/ErrorDisplay';
import { Loading } from 'pages/Loading';
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from 'api/helpers/errorTypes';
import { useHome } from '../hooks/useHome';

export const Home = () => {
  const HomeData = useHome();

  const {
    loggedInUserData,
    loggedInUserDataError,
    loggedInUserDataIsLoading,
    homePosts,
    homePostsError,
    homePostsIsLoading,
  } = HomeData;

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

  if (homePostsIsLoading) {
    return <Loading />;
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
      {loggedInUserData && (
        <ContentSubmission loggedInUser={loggedInUserData} />
      )}
      {homePosts &&
        homePosts.map((post) => <Content key={post.post_id} content={post} />)}
    </div>
  );
};
