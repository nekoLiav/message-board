import { useValidatedUserDataQuery } from 'api';
import { Content } from 'features/Content';
import { ContentSubmission } from 'features/ContentSubmission';
import { ErrorDisplay } from 'pages/ErrorDisplay';
import { Loading } from 'pages/Loading';
import { useLoaderData } from 'react-router-dom';
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from 'api/helpers/errorTypes';

type HomeLoader = {
  homePosts?: PostType[];
};

export const Home = () => {
  const { homePosts } = useLoaderData() as HomeLoader;
  const {
    data: currentUser,
    error: userDataError,
    isLoading: userDataIsLoading,
  } = useValidatedUserDataQuery();

  if (userDataIsLoading) {
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

  return (
    <div>
      {currentUser && <ContentSubmission currentUser={currentUser} />}
      {homePosts &&
        homePosts.map((post) => <Content key={post.post_id} content={post} />)}
    </div>
  );
};
