import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import { messageConverter } from './firestoreDataCoversion';

export default async function getMessages(id: Required<string>) {
  const messages: MessageType[] = [];
  try {
    const messageRefs = query(
      collection(db, 'messages').withConverter(messageConverter),
      where('recipient', '==', id),
      where('is_reply', '==', false)
    );
    const messageSnap = await getDocs(messageRefs);
    messageSnap.forEach((message) => {
      const messageData = message.data();
      if (messageData) {
        messages.push(messageData);
      }
    });
  } catch (error) {
    console.log('Something went wrong!', error);
  }
  return messages;
}
