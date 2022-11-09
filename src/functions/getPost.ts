import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase-config';

export const getPost = async (post_id: string) => {
  try {
    const postRef = doc(db, 'posts', post_id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  } catch (error) {
    console.log('Something went wrong!', error);
  }
};
