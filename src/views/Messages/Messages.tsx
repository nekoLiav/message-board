import Content from '../../components/Content/Content';
import useMessages from '../../hooks/useMessages';
import { MessagesContainer } from './style';

const Messages = () => {
  const { messages, isLoading } = useMessages();

  if (!isLoading) {
    return (
      <MessagesContainer>
        {messages &&
          messages.map((m) => <Content key={m.message_id} content={m} />)}
      </MessagesContainer>
    );
  }
  return null;
};

export default Messages;
