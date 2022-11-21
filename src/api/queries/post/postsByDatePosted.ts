import {
  query,
  collection,
  where,
  getDocs,
  orderBy,
  OrderByDirection,
} from 'firebase/firestore';
import { db } from 'config';
import { postConverter } from 'functions/firestoreDataCoversion';

export async function postsByDatePosted(order: OrderByDirection) {
  const homePostRefs = query(
    collection(db, 'posts').withConverter(postConverter),
    where('is_reply', '==', false),
    orderBy('date_posted', order)
  );
  const homePostSnap = await getDocs(homePostRefs);
  const homePosts = homePostSnap.docs.map((doc) => doc.data());
  return homePosts;
}
