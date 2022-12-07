import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
import { Loading } from 'pages/Loading';
import { ErrorDisplay } from 'pages/ErrorDisplay';
import { usePostThreadQuery, useValidatedUserDataQuery } from 'api';
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from 'api/helpers/errorTypes';
import { useParams } from 'react-router-dom';

export const PostThread = () => {
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

  const params = useParams();

  if (!params.post_id) {
    throw new Error("Error! Somehow there's no valid url. Try reloading.");
  }

  const {
    data,
    error: postThreadError,
    isLoading: postThreadIsLoading,
  } = usePostThreadQuery(params.post_id);

  if (postThreadIsLoading || !data) {
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

  const { post, parents, replies } = data;

  return (
    <div>
      {parents &&
        parents.map((post) => (
          <Content key={post.post_id} content={post} chain={true} />
        ))}
      {post && <Content content={post} main={true} />}
      {currentUser && (
        <ContentSubmission post={post} currentUser={currentUser} />
      )}
      {replies &&
        replies.map((post) => <Content key={post.post_id} content={post} />)}
    </div>
  );
};
