import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '@/config';
import { messageConverter } from '@/functions/firestoreDataCoversion';
import { useRouteLoaderData } from 'react-router-dom';
import { isUser } from '@/functions/assertUnknowns';

export default function useMessageThread() {
  const [thread, setThread] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const { message_id } = useParams();

  const clientUser = isUser(useRouteLoaderData('app'));

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const threadRef = query(
        collection(db, 'messages').withConverter(messageConverter),
        where('parent_id', '==', message_id)
      );
      const threadSnap = await getDocs(threadRef);
      threadSnap.forEach((message) => setThread([...thread, message.data()]));
      setIsLoading(false);
    })();
  }, [message_id]);

  return { clientUser, message_id, thread, isLoading };
}
