import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase-config';
import { userConverter } from './firestoreDataCoversion';

export default async function getUserByHandle(handle: Required<string>) {
  try {
    const userRef = query(
      collection(db, 'users').withConverter(userConverter),
      where('handle', '==', handle)
    );
    const userSnap = await getDocs(userRef);
    const userData = userSnap.docs[0].data();
    return userData;
  } catch (error) {
    console.log('Something went wrong!', error);
  }
}
