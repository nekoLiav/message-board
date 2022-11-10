import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase-config';

export const getParents = (ids: Required<string[]>) => {
  const parentPosts: PostType[] = [];
  try {
    ids.forEach(async (id) => {
      const parentRef = doc(db, 'posts', id);
      const parentSnap = await getDoc(parentRef);
      parentPosts.push(Object.create(parentSnap.data()));
    });
  } catch (error) {
    console.log('Something went wrong!', error);
  }
  return parentPosts;
};
