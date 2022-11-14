import { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
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
    <div>
      {messages &&
        messages.map((message) => (
          <Message key={message.message_id} message={message} />
        ))}
    </div>
  );
};

export default Messages;
