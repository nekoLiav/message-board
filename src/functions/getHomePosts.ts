import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import { postConverter } from './firestoreDataCoversion';

export const getHomePosts = async () => {
  const homePosts: PostType[] = [];
  try {
    const homePostRefs = query(
      collection(db, 'posts').withConverter(postConverter),
      where('is_reply', '==', false)
    );
    const homePostSnap = await getDocs(homePostRefs);
    homePostSnap.forEach((post) => homePosts.push(post.data()));
  } catch (error) {
    console.log('Something went wrong!', error);
  }
  return homePosts;
};
