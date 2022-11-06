import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

export const getHomePosts = async () => {
  const homePosts = [];
  const homePostRefs = query(
    collection(db, 'posts'),
    where('is_reply', '==', false)
  );
  const homePostSnap = await getDocs(homePostRefs);
  homePostSnap.forEach((post) => homePosts.push(post.data()));
  return homePosts;
};
