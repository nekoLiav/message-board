import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase-config';
import { postConverter } from './firestoreDataCoversion';

export const getParents = (ids: Required<string[]>) => {
  const parentPosts: PostType[] = [];
  try {
    ids.forEach(async (id) => {
      const parentRef = doc(db, 'posts', id).withConverter(postConverter);
      const parentSnap = await getDoc(parentRef);
      const parentData = parentSnap.data();
      if (parentData) {
        parentPosts.push(parentData);
      }
    });
  } catch (error) {
    console.log('Something went wrong!', error);
  }
  return parentPosts;
};
