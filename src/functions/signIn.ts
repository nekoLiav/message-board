import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase/firebase-config';
import getUserByID from './getUserByID';

export default signInWithEmailAndPassword(auth, 'peepee@poopoo.com', '123456')
  .then(async (userCredential) => {
    const clientUserID = await userCredential.user.uid;
    const clientUser = await getUserByID(clientUserID);
    return clientUser;
  })
  .catch((error) => {
    console.log('Something went wrong!', error);
  });
