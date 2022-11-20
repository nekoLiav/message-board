import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'config';

import { doc, getDoc } from 'firebase/firestore';
import { db } from 'config';
import { userConverter } from 'functions/firestoreDataCoversion';

export default signInWithEmailAndPassword(auth, 'peepee@poopoo.com', '123456')
  .then(async (UserCredential) => {
    const userRef = doc(db, 'users', UserCredential.user.uid).withConverter(
      userConverter
    );
    const userSnap = await getDoc(userRef);
    const currentUser = userSnap.data();
    return { currentUser };
  })
  .catch((error: Error) => {
    console.log('Something went wrong!', error);
  });
