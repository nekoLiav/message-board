import { Content } from 'features/Content';
import { useLoaderData } from 'react-router-dom';

type MessagesLoader = {
  currentUser?: UserType;
  messages?: MessageType[];
};

export const Messages = () => {
  const { currentUser, messages } = useLoaderData() as MessagesLoader;

  return (
    <div>
      {messages &&
        messages.map((message) => (
          <Content key={message.message_id} content={message} />
        ))}
    </div>
  );
};
