import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
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
    <div>
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
    </div>
  );
};
