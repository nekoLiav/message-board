import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from 'config';
import { postConverter } from 'functions/firestoreDataCoversion';

export default async function homeLoader() {
  const homePostRefs = query(
    collection(db, 'posts').withConverter(postConverter),
    where('is_reply', '==', false)
  );
  const homePostSnap = await getDocs(homePostRefs);
  const homePostData = homePostSnap.docs.map((doc) => doc.data());
  return { homePostData };
}
