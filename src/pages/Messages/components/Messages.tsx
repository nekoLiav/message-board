import { Content } from 'features/Content';
import { Loading } from 'pages/Loading';
import { ErrorDisplay } from 'pages/ErrorDisplay';
import { useMessagesQuery } from 'api';
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from 'api/helpers/errorTypes';

export const Messages = () => {
  const {
    data: messages,
    error: messagesError,
    isLoading: messagesIsLoading,
  } = useMessagesQuery();

  if (messagesIsLoading || !messages) {
    return <Loading />;
  }

  if (messagesError) {
    if (isFetchBaseQueryError(messagesError)) {
      const errMsg = JSON.stringify(messagesError.data);
      return <ErrorDisplay loadingError={errMsg} />;
    }
    if (isErrorWithMessage(messagesError)) {
      return <ErrorDisplay loadingError={messagesError.message} />;
    }
  }

  return (
    <div>
      {messages &&
        messages.map((message) => (
          <Content key={message.message_id} content={message} />
        ))}
    </div>
  );
};
