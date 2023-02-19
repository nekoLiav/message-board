import {
  query,
  collection,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db } from 'config';
import { userConverter } from 'functions/firestoreDataCoversion';

export async function userByHandle(handle?: string) {
  const userRef = query(
    collection(db, 'users').withConverter(userConverter),
    where('handle', '==', handle)
  );
  const userSnap = await getDocs(userRef);
  const user = userSnap.docs[0]?.data();
  if (user) {
    const { seconds } = user.joined_date as Timestamp;
    const formattedUser = {
      ...user,
      joined_date: seconds,
    };
    return formattedUser;
  }
  return undefined;
}
