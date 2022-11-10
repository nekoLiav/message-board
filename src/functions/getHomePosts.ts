import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';

export const getHomePosts = async () => {
  const homePosts: PostType[] = [];
  try {
    const homePostRefs = query(
      collection(db, 'posts'),
      where('is_reply', '==', false)
    );
    const homePostSnap = await getDocs(homePostRefs);
    homePostSnap.forEach((post) => homePosts.push(post.data() as PostType));
  } catch (error) {
    console.log('Something went wrong!', error);
  }
  return homePosts;
};
