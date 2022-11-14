import { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { MessageContainer } from '../components/Containers';
import Message from '../components/Message';
import { isUser } from '../functions/assertUnknowns';
import { getClientUserMessages } from '../functions/getMessages';

const Messages = () => {
  const [messages, setMessages] = useState<MessageType[]>();
  const clientUser = isUser(useRouteLoaderData('app'));

  useEffect(() => {
    (async () => {
      const fetchedMessages = await getClientUserMessages(clientUser.id);
      setMessages(fetchedMessages);
    })();
  }, []);

  return (
    <MessageContainer>
      {messages &&
        messages.map((message) => (
          <Message key={message.message_id} message={message} />
        ))}
    </MessageContainer>
  );
};

export default Messages;
