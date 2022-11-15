import { useEffect, useState } from 'react';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import PostSubmission from '../../components/PostSubmission/PostSubmission';
import { isUser } from '../../functions/assertUnknowns';
import getMessageThread from '../../functions/getMessageThread';
import { assertDefined } from '../../functions/assertDefined';
import Content from '../../components/Post/Content';
import { MessageThreadContainer } from './style';

const MessageThread = () => {
  const [thread, setThread] = useState<MessageType[]>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const clientUser = isUser(useRouteLoaderData('app'));
  const params = useParams();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (params.message_id) {
        const threadData = await getMessageThread(params.message_id);
        assertDefined(threadData, 'threadData in MessageThread.tsx');
        setThread(threadData.sort((a, b) => a.date_posted - b.date_posted));
        setIsLoading(false);
      }
    })();
  }, [params]);

  if (!isLoading && thread) {
    return (
      <MessageThreadContainer>
        {thread.map((m, i) => (
          <Content
            key={m.message_id}
            content={m}
            chain={i !== thread.length - 1}
          />
        ))}
        <PostSubmission
          message={params.message_id}
          recipient={thread[0].recipient}
          clientUser={clientUser}
        />
      </MessageThreadContainer>
    );
  }
  return null;
};

export default MessageThread;
