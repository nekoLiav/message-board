import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase-config';

export const getUserByHandle = async (handle: Required<string>) => {
  try {
    const userRef = query(
      collection(db, 'users'),
      where('handle', '==', handle)
    );
    const userSnap = await getDocs(userRef);
    return userSnap.docs[0].data();
  } catch (error) {
    console.log('Something went wrong!', error);
  }
};
