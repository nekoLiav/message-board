import { doc, collection, setDoc } from 'firebase/firestore';
import { db } from './firebase-config';
import { messageConverter } from './firestoreDataCoversion';

type submitMessageArgs = {
  clientUser: UserType;
  recipient?: UserType;
  message?: MessageType;
};

export const submitMessage = (
  data: string,
  { clientUser, recipient, message }: submitMessageArgs
) => {
  if (recipient) {
    const { id } = recipient;
    try {
      const newMessageDoc = doc(
        collection(db, 'messages').withConverter(messageConverter)
      );
      const messageTemplate: MessageType = {
        user_data: {
          id: clientUser.id,
          name: clientUser.name,
          handle: clientUser.handle,
          avatar: clientUser.avatar,
        },
        message_id: newMessageDoc.id,
        recipient: id,
        date_posted: Date.now(),
        img_url: null,
        vid_url: null,
        text: data,
        parent_message: null,
        is_reply: false,
      };
      if (message) {
        if (message.parent_message === null) {
          const replyTemplate: MessageType = {
            ...messageTemplate,
            parent_message: message.message_id,
            is_reply: true,
          };
          try {
            setDoc(newMessageDoc, replyTemplate);
          } catch (error) {
            console.log('Something went wrong!', error);
          }
        }
        if (message.parent_message !== null) {
          const replyTemplate: MessageType = {
            ...messageTemplate,
            parent_message: message.parent_message,
            is_reply: true,
          };
          try {
            setDoc(newMessageDoc, replyTemplate);
          } catch (error) {
            console.log('Something went wrong!', error);
          }
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
  }
};
