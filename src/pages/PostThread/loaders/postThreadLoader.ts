import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from 'config';
import { postConverter } from 'functions/firestoreDataCoversion';

export default async function postThreadLoader(post_id: string) {
  const postRef = doc(db, 'posts', post_id).withConverter(postConverter);
  const postSnap = await getDoc(postRef);

  const post = postSnap.data();
  const parents: PostType[] = [];
  const replies: PostType[] = [];

  if (post && post.parent_ids.length) {
    post.parent_ids.forEach(async (parent_id) => {
      const parentRef = doc(db, 'posts', parent_id).withConverter(
        postConverter
      );
      const parentSnap = await getDoc(parentRef);
      const parentData = parentSnap.data();
      if (parentData) parents.push(parentData);
    });
  }

  const replyRefs = query(
    collection(db, 'posts').withConverter(postConverter),
    where('direct_parent', '==', post_id)
  );
  const replySnap = await getDocs(replyRefs);
  replySnap.docs.forEach((doc) => replies.push(doc.data()));

  return { post, parents, replies };
}
