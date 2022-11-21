import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from 'config';
import { userConverter } from 'functions/firestoreDataCoversion';

export async function userByHandle(handle?: string) {
  const userRef = query(
    collection(db, 'users').withConverter(userConverter),
    where('handle', '==', handle)
  );
  const userSnap = await getDocs(userRef);
  const user = userSnap.docs[0]?.data();
  return user;
}
