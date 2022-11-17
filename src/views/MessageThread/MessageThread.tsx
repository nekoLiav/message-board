import ContentSubmission from '@/components/ContentSubmission/ContentSubmission';
import Content from '@/components/Content/Content';
import { MessageThreadContainer } from './style';
import useMessageThread from '@/hooks/useMessageThread';

const MessageThread = () => {
  const { clientUser, message_id, thread, isLoading } = useMessageThread();

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

export default MessageThread;
