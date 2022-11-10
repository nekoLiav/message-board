import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';
import { getUser } from './getUserByID';

export default signInWithEmailAndPassword(auth, 'peepee@poopoo.com', '123456')
  .then(async (userCredential) => {
    const clientUserID = await userCredential.user.uid;
    const clientUser = await getUser(clientUserID);
    return clientUser as UserType;
  })
  .catch((error) => {
    console.log('Something went wrong!', error);
  });
