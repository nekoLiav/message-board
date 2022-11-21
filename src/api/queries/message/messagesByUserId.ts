import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from 'config';
import { messageConverter } from 'functions/firestoreDataCoversion';

export async function messagesByUserId(user_id?: string) {
  const messageRefs = query(
    collection(db, 'messages').withConverter(messageConverter),
    where('recipient', '==', user_id),
    where('is_reply', '==', false)
  );
  const messageSnap = await getDocs(messageRefs);
  const messages = messageSnap.docs.map((doc) => doc.data());
  return messages;
}
