import { Timestamp, doc, getDoc } from 'firebase/firestore';
import { db } from 'config';
import { userConverter } from 'functions/firestoreDataCoversion';

export async function userDataById(user_id: string) {
  const userRef = doc(db, 'users', user_id).withConverter(userConverter);
  const userSnap = await getDoc(userRef);
  const currentUser = userSnap.data();
  if (currentUser) {
    const { seconds } = currentUser.joined_date as Timestamp;
    const formattedUser = {
      ...currentUser,
      joined_date: seconds,
    };
    return formattedUser;
  }
  return undefined;
}
