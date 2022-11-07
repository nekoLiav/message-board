import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';

export const getPost = async (id) => {
  try {
    const postRef = doc(db, 'posts', id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  } catch (error) {
    console.log('Something went wrong!', error);
  }
};
