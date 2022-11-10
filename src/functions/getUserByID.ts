import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase-config';

export const getUser = async (id: Required<string>) => {
  try {
    const userRef = doc(db, 'users', id);
    const userSnap = await getDoc(userRef);
    // type assertion hack to get things working for now
    return userSnap.data() as UserType;
  } catch (error) {
    console.log('Something went wrong!', error);
  }
};
