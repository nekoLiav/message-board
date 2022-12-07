import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
import { useValidatedUserDataQuery, useMessageThreadQuery } from 'api';
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from 'api/helpers/errorTypes';
import { Loading } from 'pages/Loading';
import { ErrorDisplay } from 'pages/ErrorDisplay';
import { useParams } from 'react-router-dom';

export const MessageThread = () => {
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

  const { message_id } = useParams();

  if (!message_id) {
    throw new Error("Error! Somehow there's no valid url. Try reloading.");
  }

  const {
    data,
    error: messageThreadError,
    isLoading: messageThreadIsLoading,
  } = useMessageThreadQuery(message_id);

  if (messageThreadIsLoading || !data) {
    return <Loading />;
  }

  if (messageThreadError) {
    if (isFetchBaseQueryError(messageThreadError)) {
      const errMsg = JSON.stringify(messageThreadError.data);
      return <ErrorDisplay loadingError={errMsg} />;
    }
    if (isErrorWithMessage(messageThreadError)) {
      return <ErrorDisplay loadingError={messageThreadError.message} />;
    }
  }

  const { thread } = data;

  return (
    <div>
      {thread.map((message, index) => (
        <Content
          key={message.message_id}
          content={message}
          chain={index !== thread.length - 1}
        />
      ))}
      {currentUser && (
        <ContentSubmission
          message={message_id}
          recipient={thread[0]?.recipient}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};
