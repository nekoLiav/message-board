import { query, collection, where, getDocs } from 'firebase/firestore';
import { messageConverter } from 'functions/firestoreDataCoversion';
import { db, auth } from 'config';
import { useQuery } from '@tanstack/react-query';

export default function useMessages() {
  return useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const messageRefs = query(
        collection(db, 'messages').withConverter(messageConverter),
        where('recipient', '==', 'vL6bkyWoSUaHbHdh9b7KKu1Foxbx'),
        where('is_reply', '==', false)
      );
      const messageSnap = await getDocs(messageRefs);
      return messageSnap.docs.map((doc) => doc.data());
    },
  });
}
