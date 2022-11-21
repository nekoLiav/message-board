import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from 'config';
import { postConverter } from 'functions/firestoreDataCoversion';

export async function postReplies(post_id?: string) {
  const replyRefs = query(
    collection(db, 'posts').withConverter(postConverter),
    where('direct_parent', '==', post_id)
  );
  const replySnap = await getDocs(replyRefs);
  const replies = replySnap.docs.map((doc) => doc.data());
  return replies;
}
