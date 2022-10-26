import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAe3WUJ9sSXaJuSoeVhejz-2jG04ldJxbI',
  authDomain: 'message-board-f9ffa.firebaseapp.com',
  projectId: 'message-board-f9ffa',
  storageBucket: 'message-board-f9ffa.appspot.com',
  messagingSenderId: '850772754423',
  appId: '1:850772754423:web:fbf2db088f327b6c9778f2',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);

const auth = getAuth();
connectAuthEmulator(auth, 'http://localhost:9099');

signInAnonymously(auth)
  .then(() => {
    // Signed in..
  })
  .catch((error) => {
    console.log(error.code, error.message);
    // ...
  });
