import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from 'config';
import { postConverter } from 'functions/firestoreDataCoversion';

export async function postsByUserId(userId?: string) {
  const userPostRefs = query(
    collection(db, 'posts').withConverter(postConverter),
    where('user_id', '==', userId),
    where('is_reply', '==', false)
  );
  const userPostSnap = await getDocs(userPostRefs);
  const userPosts = userPostSnap.docs.map((doc) => doc.data());
  return userPosts;
}
