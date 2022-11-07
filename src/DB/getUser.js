import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

export const getUser = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.data();
  } catch (error) {
    console.log('Something went wrong!', error);
  }
};
