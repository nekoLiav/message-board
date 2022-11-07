import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

export const getUser = async (id) => {
  try {
    const userRef = doc(db, 'users', id);
    const userSnap = await getDoc(userRef);
    return userSnap.data();
  } catch (error) {
    console.log('Something went wrong!', error);
  }
};
