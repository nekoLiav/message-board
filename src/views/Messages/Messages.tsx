import { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import Content from '../../components/Content/Content';
import { isUser } from '../../functions/assertUnknowns';
import getMessages from '../../functions/getMessages';
import { MessagesContainer } from './style';

const Messages = () => {
  const [messages, setMessages] = useState<MessageType[]>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const clientUser = isUser(useRouteLoaderData('app'));

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const fetchedMessages = await getMessages(clientUser.id);
      setMessages(fetchedMessages);
      setIsLoading(false);
    })();
  }, []);

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
