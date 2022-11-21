import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
import { MessageThreadContainer } from './style';
import { useLoaderData } from 'react-router-dom';

type MessageThreadLoader = {
  currentUser: UserType;
  message_id: string;
  thread: MessageType[];
};

export const MessageThread = () => {
  const { currentUser, message_id, thread } =
    useLoaderData() as MessageThreadLoader;

  return (
    <MessageThreadContainer>
      {thread.map((message, index) => (
        <Content
          key={message.message_id}
          content={message}
          chain={index !== thread.length - 1}
        />
      ))}
      <ContentSubmission
        message={message_id}
        recipient={thread[0]?.recipient}
        currentUser={currentUser}
      />
    </MessageThreadContainer>
  );
};
