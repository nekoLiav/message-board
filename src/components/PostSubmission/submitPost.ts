import { doc, collection, setDoc } from 'firebase/firestore';
import { InferProps } from 'prop-types';
import { db } from '../../firebase/firebase-config';
import { PostType, UserType } from '../../Types/PropTypes';

const submitPostArgTypes = {
  user: UserType,
  post: PostType,
};

type submitPostArgs = InferProps<typeof submitPostArgTypes>;

export const submitPost = (e: Event, { user, post }: submitPostArgs) => {
  e.preventDefault();
  try {
    const newPostDoc = doc(collection(db, 'posts'));
    const postTemplate = {
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
