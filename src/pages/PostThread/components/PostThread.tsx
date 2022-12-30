import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
import { Loading } from 'pages/Loading';
import { ErrorDisplay } from 'pages/ErrorDisplay';
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from 'api/helpers/errorTypes';
import { usePostThread } from '../hooks/usePostThread';

export const PostThread = () => {
  const {
    loggedInUserData,
    loggedInUserDataError,
    loggedInUserDataIsLoading,
    postThreadData,
    postThreadError,
    postThreadIsLoading,
  } = usePostThread();

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

  if (postThreadIsLoading || !postThreadData) {
    return <Loading />;
  }

  if (postThreadError) {
    if (isFetchBaseQueryError(postThreadError)) {
      const errMsg = JSON.stringify(postThreadError.data);
      return <ErrorDisplay loadingError={errMsg} />;
    }
    if (isErrorWithMessage(postThreadError)) {
      return <ErrorDisplay loadingError={postThreadError.message} />;
    }
  }

  const { post, parents, replies } = postThreadData;

  return (
    <div>
      {parents &&
        parents.map((post) => (
          <Content key={post.post_id} content={post} chain={true} />
        ))}
      {post && <Content content={post} main={true} />}
      {loggedInUserData && (
        <ContentSubmission post={post} loggedInUser={loggedInUserData} />
      )}
      {replies &&
        replies.map((post) => <Content key={post.post_id} content={post} />)}
    </div>
  );
};
