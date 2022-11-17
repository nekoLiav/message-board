import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
import { MessageThreadContainer } from './style';
import useGetMessageThread from '../hooks/useGetMessageThread';

export const MessageThread = () => {
  const { clientUser, message_id, thread, isLoading } = useGetMessageThread();

  if (!isLoading) {
    return (
      <MessageThreadContainer>
        {thread.map((m, i) => (
          <Content
            key={m.message_id}
            content={m}
            chain={i !== thread.length - 1}
          />
        ))}
        <ContentSubmission
          message={message_id}
          recipient={thread[0].recipient}
          clientUser={clientUser}
        />
      </MessageThreadContainer>
    );
  }
  return null;
};
