import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase-config';

export const getParents = (ids: Required<string[]>) => {
  const parentPosts: PostType[] = [];
  try {
    ids.forEach(async (id) => {
      const parentRef = doc(db, 'posts', id);
      const parentSnap = await getDoc(parentRef);
      // type assertion hack to get things working for now
      parentPosts.push(parentSnap.data() as PostType);
    });
  } catch (error) {
    console.log('Something went wrong!', error);
  }
  return parentPosts;
};
