import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';

export const getReplies = async (id: Required<string>) => {
  const replyPosts: PostType[] = [];
  try {
    const replyRefs = query(
      collection(db, 'posts'),
      where('direct_parent', '==', id)
    );
    const replySnap = await getDocs(replyRefs);
    replySnap.forEach((reply) => {
      // type assertion hack to get things working for now
      replyPosts.push(reply.data() as PostType);
    });
  } catch (error) {
    console.log('Something went wrong!', error);
  }
  return replyPosts;
};
