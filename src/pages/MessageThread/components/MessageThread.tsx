import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
import { MessageThreadContainer } from './style';
import useMessageThread from '../hooks/useMessageThread';
import { Loading } from 'pages/Loading';
import { useParams } from 'react-router-dom';

export const MessageThread = () => {
  const { message_id } = useParams();
  const { status, data, error } = useMessageThread(message_id);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return <Loading />;
  }

  return (
    <MessageThreadContainer>
      {data.map((message, index) => (
        <Content
          key={message.message_id}
          content={message}
          chain={index !== data.length - 1}
        />
      ))}
      {/* <ContentSubmission
        message={message_id}
        recipient={data[0].recipient}
        clientUser={clientUser}
      /> */}
    </MessageThreadContainer>
  );
};
