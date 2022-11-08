import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';

export const getUserPosts = async (user_id: string) => {
  const UserPosts = [];
  try {
    const UserPostRefs = query(
      collection(db, 'posts'),
      where('user_id', '==', user_id),
      where('is_reply', '==', false)
    );
    const UserPostSnap = await getDocs(UserPostRefs);
    UserPostSnap.forEach((post) => UserPosts.push(post.data()));
  } catch (error) {
    console.log('Something went wrong!', error);
  }
  return UserPosts;
};
