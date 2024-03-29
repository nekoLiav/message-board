import { doc, collection, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase/firebase-config';
import { messageConverter } from './firestoreDataCoversion';

type submitMessageArgs = {
  loggedInUser: UserType;
  recipient: string;
  message?: string;
};

export const submitMessage = (
  data: {
    body: string;
    img?: string;
  },
  { loggedInUser, recipient, message }: submitMessageArgs
) => {
  try {
    const newMessageDoc = doc(
      collection(db, 'messages').withConverter(messageConverter)
    );
    const messageTemplate: MessageType = {
      user_data: {
        id: loggedInUser.id,
        name: loggedInUser.name,
        handle: loggedInUser.handle,
        avatar: loggedInUser.avatar,
      },
      message_id: newMessageDoc.id,
      recipient: recipient,
      date_posted: Date.now(),
      text: data.body,
      img_url: null,
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
        if (data.img) {
          const imgAppendedMessageTemplate: MessageType = {
            ...messageTemplate,
            img_url: data.img,
          };
          setDoc(newMessageDoc, imgAppendedMessageTemplate);
        } else {
          setDoc(newMessageDoc, messageTemplate);
        }
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    }
  } catch (error) {
    console.log('Something went wrong!', error);
  }
};
