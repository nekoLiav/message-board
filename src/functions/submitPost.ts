import { doc, collection, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase/firebase-config';
import { postConverter } from './firestoreDataCoversion';

type submitPostArgs = {
  currentUser: UserType;
  post?: PostType;
};

export const submitPost = (
  data: string,
  { currentUser, post }: submitPostArgs
) => {
  try {
    const newPostDoc = doc(
      collection(db, 'posts').withConverter(postConverter)
    );
    const postTemplate: PostType = {
      user_data: {
        id: currentUser.id,
        name: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
      },
      post_id: newPostDoc.id,
      parent_ids: [],
      date_posted: Date.now(),
      text: data,
      tags: [],
      replies: 0,
      reposts: 0,
      likes: 0,
      is_reply: false,
    };
    if (post) {
      const replyTemplate: PostType = {
        ...postTemplate,
        parent_ids: [...post.parent_ids, post.post_id],
        direct_parent: post.post_id,
        is_reply: true,
      };
      try {
        setDoc(newPostDoc, replyTemplate);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    } else {
      try {
        setDoc(newPostDoc, postTemplate);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    }
  } catch (error) {
    console.log('Something went wrong!', error);
  }
};
