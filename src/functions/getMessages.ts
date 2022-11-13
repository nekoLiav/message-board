import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import { messageConverter } from './firestoreDataCoversion';

export const getClientUserMessages = async (id: Required<string>) => {
  const clientUserMessages: MessageType[] = [];
  try {
    const clientUserMessageRefs = query(
      collection(db, 'messages').withConverter(messageConverter),
      where('recipient', '==', id),
      where('is_reply', '==', false)
    );
    const clientUserMessageSnap = await getDocs(clientUserMessageRefs);
    clientUserMessageSnap.forEach((message) => {
      const messageData = message.data();
      if (messageData) {
        clientUserMessages.push(messageData);
      }
    });
  } catch (error) {
    console.log('Something went wrong!', error);
  }
  return clientUserMessages;
};
