import { doc, getDoc } from 'firebase/firestore';
import { db } from 'config';
import { postConverter } from 'functions/firestoreDataCoversion';

export async function postParents(parent_ids?: string[]) {
  const parents: PostType[] = [];
  parent_ids?.forEach(async (parent_id) => {
    const parentRef = doc(db, 'posts', parent_id).withConverter(postConverter);
    const parentSnap = await getDoc(parentRef);
    const parentData = parentSnap.data();
    if (parentData) {
      parents.push(parentData);
    }
  });
  return parents;
}
