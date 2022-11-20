import { doc, collection, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase/firebase-config';
import { messageConverter } from './firestoreDataCoversion';

type submitMessageArgs = {
  currentUser: UserType;
  recipient: string;
  message?: string;
};

export const submitMessage = (
  data: string,
  { currentUser, recipient, message }: submitMessageArgs
) => {
  try {
    const newMessageDoc = doc(
      collection(db, 'messages').withConverter(messageConverter)
    );
    const messageTemplate: MessageType = {
      user_data: {
        id: currentUser.id,
        name: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
      },
      message_id: newMessageDoc.id,
      recipient: recipient,
      date_posted: Date.now(),
      text: data,
      parent_id: newMessageDoc.id,
      is_reply: false,
    };
    if (message) {
      const replyTemplate: MessageType = {
        ...messageTemplate,
        parent_id: message,
        is_reply: true,
      };
      try {
        setDoc(newMessageDoc, replyTemplate);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    } else {
      try {
        setDoc(newMessageDoc, messageTemplate);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    }
  } catch (error) {
    console.log('Something went wrong!', error);
  }
};
