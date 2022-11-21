import { Content } from 'features/Content';
import { MessagesContainer } from './style';
import { useLoaderData } from 'react-router-dom';

type MessagesLoader = {
  currentUser?: UserType;
  messages?: MessageType[];
};

export const Messages = () => {
  const { currentUser, messages } = useLoaderData() as MessagesLoader;

  return (
    <MessagesContainer>
      {messages &&
        messages.map((message) => (
          <Content key={message.message_id} content={message} />
        ))}
    </MessagesContainer>
  );
};
