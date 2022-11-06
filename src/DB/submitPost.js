import { doc, collection, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

export const submitPost = (e, props) => {
  e.preventDefault();
  const newPostDoc = doc(collection(db, 'posts'));
  const postTemplate = {
    user_id: props.id,
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
  if (props.post !== undefined) {
    const replyTemplate = {
      ...postTemplate,
      parent_ids: [...props.post.parent_ids, props.post.post_id],
      direct_parent: props.post.post_id,
      is_reply: true,
    };
    setDoc(newPostDoc, replyTemplate);
  } else {
    setDoc(newPostDoc, postTemplate);
  }
};
