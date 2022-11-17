import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase/firebase-config';
import { userConverter } from './firestoreDataCoversion';

export default async function getUserByID(id: Required<string>) {
  try {
    const userRef = doc(db, 'users', id).withConverter(userConverter);
    const userSnap = await getDoc(userRef);
    return userSnap.data();
  } catch (error) {
    console.log('Something went wrong!', error);
  }
}
