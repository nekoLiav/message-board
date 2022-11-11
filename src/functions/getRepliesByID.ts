import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import { postConverter } from './firestoreDataCoversion';

export const getReplies = async (id: Required<string>) => {
  const replyPosts: PostType[] = [];
  try {
    const replyRefs = query(
      collection(db, 'posts').withConverter(postConverter),
      where('direct_parent', '==', id)
    );
    const replySnap = await getDocs(replyRefs);
    replySnap.forEach((reply) => {
      const replyData = reply.data();
      if (replyData) {
        replyPosts.push(replyData);
      }
    });
  } catch (error) {
    console.log('Something went wrong!', error);
  }
  return replyPosts;
};
