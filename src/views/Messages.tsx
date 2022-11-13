import { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import Message from '../components/Message';
import { isUser } from '../functions/assertUnknowns';
import { getClientUserMessages } from '../functions/getMessages';
import { Div } from '../styles/Div';

const StyledMessages = styled(Div)``;

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
    <StyledMessages>
      {messages &&
        messages.map((message) => (
          <Message key={message.message_id} message={message} />
        ))}
    </StyledMessages>
  );
};

export default Messages;
