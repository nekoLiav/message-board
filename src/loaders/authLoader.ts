import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'config';

import { doc, getDoc } from 'firebase/firestore';
import { db } from 'config';
import { userConverter } from 'functions/firestoreDataCoversion';

export default signInWithEmailAndPassword(auth, 'peepee@poopoo.com', '123456')
  .then(async (userCredential) => {
    console.log('signed in!');
    const userRef = doc(db, 'users', userCredential.user.uid).withConverter(
      userConverter
    );
    const userSnap = await getDoc(userRef);
    return userSnap.data();
  })
  .catch((error: Error) => {
    console.log('Something went wrong!', error);
  });
