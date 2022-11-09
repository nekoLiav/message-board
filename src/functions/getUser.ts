import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase-config';

export const getUser = async (user_id: string) => {
  try {
    const userRef = doc(db, 'users', user_id);
    const userSnap = await getDoc(userRef);
    return userSnap.data();
  } catch (error) {
    console.log('Something went wrong!', error);
  }
};
