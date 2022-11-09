import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';

export const getReplies = async (id: Required<string>) => {
  const replyPosts = [];
  try {
    const replyRefs = query(
      collection(db, 'posts'),
      where('direct_parent', '==', id)
    );
    const replySnap = await getDocs(replyRefs);
    replySnap.forEach((reply) => {
      replyPosts.push(reply.data());
    });
  } catch (error) {
    console.log('Something went wrong!', error);
  }
  return replyPosts;
};
