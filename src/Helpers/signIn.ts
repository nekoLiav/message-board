import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { getUser } from '../Helpers/getUser';

export default signInWithEmailAndPassword(auth, 'peepee@poopoo.com', '123456')
  .then(async (userCredential) => {
    const id = await userCredential.user.uid;
    const userData = await getUser(id);
    return userData;
  })
  .catch((error) => {
    console.log('Something went wrong!', error);
  });
