import { doc, runTransaction } from 'firebase/firestore';
import { db } from 'config';
import { postConverter } from 'functions/firestoreDataCoversion';

export default async function postRepost(post_id: string) {
  const postRef = doc(db, 'posts', post_id).withConverter(postConverter);
  await runTransaction(db, async (transaction) => {
    const post = await transaction.get(postRef);
    if (!post.exists()) {
      throw `Post ${post_id} does not exist!`;
    }
    const newRepostCount = post.data().reposts + 1;
    transaction.update(postRef, { reposts: newRepostCount });
    return newRepostCount;
  });
}
