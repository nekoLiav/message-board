import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { auth } from 'config';

export async function validateUser() {
  function validatedUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe();
          resolve(user);
        },
        reject // pass up any errors attaching the listener
      );
    });
  }

  const user = (await validatedUser()) as User;

  // if (!user) {
  //   console.log('User not logged in.');
  //   signInWithEmailAndPassword(auth, 'definitelyrealemail@lol.net', '123456')
  //     .then(() => validateUser())
  //     .catch((error) => console.log('Sign in failed!', error));
  // } else {
  return user;
  // }
}
