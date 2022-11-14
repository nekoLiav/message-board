import { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import Message from '../components/Message/Message';
import { isUser } from '../functions/assertUnknowns';
import { getClientUserMessages } from '../functions/getMessages';

const Messages = () => {
  const [messages, setMessages] = useState<MessageType[]>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const clientUser = isUser(useRouteLoaderData('app'));

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const fetchedMessages = await getClientUserMessages(clientUser.id);
      setMessages(fetchedMessages);
      setIsLoading(false);
    })();
  }, []);

  if (!isLoading) {
    return (
      <div>
        {messages &&
          messages.map((message) => (
            <Message key={message.message_id} message={message} />
          ))}
      </div>
    );
  }
  return null;
};

export default Messages;
