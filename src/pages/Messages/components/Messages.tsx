import { Content } from 'features/Content';
import useMessages from 'hooks/useMessages';
import { MessagesContainer } from './style';

export const Messages = () => {
  const { messages, isLoading } = useMessages();

  if (!isLoading) {
    return (
      <MessagesContainer>
        {messages.map((m) => (
          <Content key={m.message_id} content={m} />
        ))}
      </MessagesContainer>
    );
  }
  return null;
};
