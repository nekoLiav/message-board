import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase-config';

export const getParents = (parent_ids: string[]) => {
  const parentPosts = [];
  try {
    parent_ids.forEach(async (parent_id) => {
      const parentRef = doc(db, 'posts', parent_id);
      const parentSnap = await getDoc(parentRef);
      parentPosts.push(parentSnap.data());
    });
  } catch (error) {
    console.log('Something went wrong!', error);
  }
  return parentPosts;
};
