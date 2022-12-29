import { onAuthStateChanged, User } from 'firebase/auth';
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

  return user;
}
