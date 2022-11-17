import { useState, useEffect } from 'react';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { messageConverter } from 'functions/firestoreDataCoversion';
import { db } from 'config';
import { useRouteLoaderData } from 'react-router-dom';
import { isUser } from 'functions/assertUnknowns';

export default function useGetMessages() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const clientUser = isUser(useRouteLoaderData('app'));

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const messageRefs = query(
        collection(db, 'messages').withConverter(messageConverter),
        where('recipient', '==', clientUser.id),
        where('is_reply', '==', false)
      );
      const messageSnap = await getDocs(messageRefs);
      messageSnap.forEach((message) => {
        setMessages([...messages, message.data()]);
      });
      setIsLoading(false);
    })();
  }, []);

  return { messages, isLoading };
}
