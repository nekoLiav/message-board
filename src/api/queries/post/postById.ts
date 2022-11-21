import { doc, getDoc } from 'firebase/firestore';
import { db } from 'config';
import { postConverter } from 'functions/firestoreDataCoversion';

export async function postById(post_id: string) {
  const postRef = doc(db, 'posts', post_id).withConverter(postConverter);
  const postSnap = await getDoc(postRef);
  const post = postSnap.data();
  return post;
}
