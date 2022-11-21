import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from 'config';
import { messageConverter } from 'functions/firestoreDataCoversion';

export async function messageThreadByMessageId(message_id: string) {
  const threadRef = query(
    collection(db, 'messages').withConverter(messageConverter),
    where('parent_id', '==', message_id)
  );
  const threadSnap = await getDocs(threadRef);
  const thread = threadSnap.docs.map((doc) => doc.data());
  return thread;
}
