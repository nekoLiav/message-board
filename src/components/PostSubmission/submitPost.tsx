import { doc, collection, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import { InferProps } from 'prop-types';
import { UserType, PostType } from '../../Types/PropTypes';

type submitPostArgs = {
  e: Event;
  user: InferProps<typeof UserType>;
  post: InferProps<typeof PostType>;
};

export const submitPost = (e, { user }, { post }: submitPostArgs) => {
  e.preventDefault();
  try {
    const newPostDoc = doc(collection(db, 'posts'));
    const postTemplate = {
      user_id: user.id,
      post_id: newPostDoc.id,
      parent_ids: [],
      date_posted: Date.now(),
      img_url: null,
      vid_url: null,
      text: e.target[0].value,
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
