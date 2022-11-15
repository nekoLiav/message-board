import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase-config';
import { messageConverter } from './firestoreDataCoversion';

export default async function getMessageThread(message_id: string) {
  try {
    const thread: MessageType[] = [];
    const threadRef = query(
      collection(db, 'messages').withConverter(messageConverter),
      where('parent_id', '==', message_id)
    );
    const threadSnap = await getDocs(threadRef);
    threadSnap.forEach((doc) => thread.push(doc.data()));
    return thread;
  } catch (error) {
    console.log('Something went wrong!', error);
  }
}
