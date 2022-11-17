import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase/firebase-config';
import { postConverter } from './firestoreDataCoversion';

export default async function getUserPosts(id: Required<string>) {
  const UserPosts: PostType[] = [];
  try {
    const UserPostRefs = query(
      collection(db, 'posts').withConverter(postConverter),
      where('user_id', '==', id),
      where('is_reply', '==', false)
    );
    const UserPostSnap = await getDocs(UserPostRefs);
    UserPostSnap.forEach((post) => {
      const postData = post.data();
      if (postData) {
        UserPosts.push(postData);
      }
    });
  } catch (error) {
    console.log('Something went wrong!', error);
  }
  return UserPosts;
}
