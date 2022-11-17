import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from 'config';
import { messageConverter } from 'functions/firestoreDataCoversion';
import { useQuery } from '@tanstack/react-query';

export default function useMessageThread(message_id?: string) {
  return useQuery({
    queryKey: ['messageThread', message_id],
    queryFn: async () => {
      const threadRef = query(
        collection(db, 'messages').withConverter(messageConverter),
        where('parent_id', '==', message_id)
      );
      const threadSnap = await getDocs(threadRef);
      return threadSnap.docs.map((doc) => doc.data());
    },
  });
}
