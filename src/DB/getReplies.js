import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

export const getReplies = async (post_id, direct_parent_id) => {
  let replyPosts = [];
  const replyRefs = query(
    collection(db, 'posts'),
    where('direct_parent', '==', post_id)
  );
  const replySnap = await getDocs(replyRefs);
  replySnap.forEach((reply) => {
    if (reply.data().direct_parent !== direct_parent_id) {
      replyPosts.push(reply.data());
    }
  });
  return replyPosts;
};
