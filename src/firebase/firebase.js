import { app } from './firebase-config';
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  getDocs,
} from 'firebase/firestore';

const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);

export const querySubnublets = async () =>
  getDocs(collection(db, 'subnublets', 'ps5', 'posts'));
