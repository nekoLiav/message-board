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
        parents: [],
        is_reply: false,
      };
      if (message) {
        if (message) {
          const replyTemplate: MessageType = {
            ...messageTemplate,
            parents: [...message.parents, message.message_id],
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
