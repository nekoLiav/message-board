import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

export const getPost = async (id) => {
  const postRef = doc(db, 'posts', id);
  const postSnap = await getDoc(postRef);
  return postSnap.data();
};
