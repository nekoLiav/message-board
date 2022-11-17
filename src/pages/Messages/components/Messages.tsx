import { Content } from 'features/Content';
import { Loading } from 'pages/Loading';
import useMessages from '../hooks/useMessages';
import { MessagesContainer } from './style';

export const Messages = () => {
  const { status, data, error } = useMessages();

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    if (error instanceof Error) {
      console.log(error);
    }
    return <Loading />;
  }

  return (
    <MessagesContainer>
      {data.map((message) => (
        <Content key={message.message_id} content={message} />
      ))}
    </MessagesContainer>
  );
};
