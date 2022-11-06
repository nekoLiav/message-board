import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

export const getParents = (parent_ids) => {
  const parentPosts = [];
  parent_ids.forEach(async (parent_id) => {
    const parentRef = doc(db, 'posts', parent_id);
    const parentSnap = await getDoc(parentRef);
    parentPosts.push(parentSnap.data());
  });
  return parentPosts;
};
