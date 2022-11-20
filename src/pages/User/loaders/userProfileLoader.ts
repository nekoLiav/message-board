import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from 'config';
import { userConverter, postConverter } from 'functions/firestoreDataCoversion';

export default async function userProfileLoader(handle: string) {
  let user;
  const userPosts: PostType[] = [];
  const userRef = query(
    collection(db, 'users').withConverter(userConverter),
    where('handle', '==', handle)
  );
  const userSnap = await getDocs(userRef);
  if (userSnap.docs[0]?.exists) {
    user = userSnap.docs[0].data();
  }

  if (user) {
    const userPostRefs = query(
      collection(db, 'posts').withConverter(postConverter),
      where('user_id', '==', user.id),
      where('is_reply', '==', false)
    );
    const userPostSnap = await getDocs(userPostRefs);
    userPostSnap.docs.forEach((doc) => userPosts.push(doc.data()));
  }

  return { user, userPosts };
}
