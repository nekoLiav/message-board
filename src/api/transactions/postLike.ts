import { doc, runTransaction } from 'firebase/firestore';
import { db } from 'config';
import { postConverter } from 'functions/firestoreDataCoversion';

export default async function postLike(post_id: string) {
  const postRef = doc(db, 'posts', post_id).withConverter(postConverter);
  await runTransaction(db, async (transaction) => {
    const post = await transaction.get(postRef);
    if (!post.exists()) {
      throw `Post ${post_id} does not exist!`;
    }
    const newLikeCount = post.data().likes + 1;
    transaction.update(postRef, { likes: newLikeCount });
    return newLikeCount;
  });
}
