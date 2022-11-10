import { doc, collection, setDoc } from 'firebase/firestore';
import { db } from './firebase-config';

export const submitPost = (
  e: React.FormEvent,
  user: UserType,
  post: PostType
) => {
  e.preventDefault();
  const target = e.target as HTMLTextAreaElement;
  try {
    const newPostDoc = doc(collection(db, 'posts'));
    const postTemplate: PostType = {
      user_data: {
        id: user.id,
        name: user.name,
        handle: user.handle,
        avatar: user.avatar,
      },
      post_id: newPostDoc.id,
      parent_ids: [],
      date_posted: Date.now(),
      img_url: null,
      vid_url: null,
      text: target.value,
      tags: [],
      replies: 0,
      reposts: 0,
      likes: 0,
      is_reply: false,
    };
    if (post !== undefined) {
      const replyTemplate = {
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
