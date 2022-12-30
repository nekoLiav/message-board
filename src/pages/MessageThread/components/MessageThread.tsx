import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from 'api/helpers/errorTypes';
import { Loading } from 'pages/Loading';
import { ErrorDisplay } from 'pages/ErrorDisplay';
import { useMessageThread } from '../hooks/useMessageThread';

export const MessageThread = () => {
  const {
    loggedInUserData,
    loggedInUserDataError,
    loggedInUserDataIsLoading,
    messageThreadData,
    messageThreadError,
    messageThreadIsLoading,
    message_id,
  } = useMessageThread();

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

  if (messageThreadIsLoading || !messageThreadData) {
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

  return (
    <div>
      {messageThreadData.map((message, index) => (
        <Content
          key={message.message_id}
          content={message}
          chain={index !== messageThreadData.length - 1}
        />
      ))}
      {loggedInUserData && (
        <ContentSubmission
          message={message_id}
          recipient={messageThreadData[0]?.recipient}
          loggedInUser={loggedInUserData}
        />
      )}
    </div>
  );
};
