import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../config/firebase/firebase-config';
import { postConverter } from './firestoreDataCoversion';
import { assertDefined } from './assertDefined';

async function getPost(id: Required<string>) {
  const postRef = doc(db, 'posts', id).withConverter(postConverter);
  const postSnap = await getDoc(postRef);
  return postSnap.data();
}

async function getPostParents(ids: Required<string[]>) {
  if (ids.length) {
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
  }
  return undefined;
}

async function getPostReplies(id: Required<string>) {
  const replyPosts: PostType[] = [];
  try {
    const replyRefs = query(
      collection(db, 'posts').withConverter(postConverter),
      where('direct_parent', '==', id)
    );
    const replySnap = await getDocs(replyRefs);
    replySnap.forEach((reply) => {
      const replyData = reply.data();
      if (replyData) {
        replyPosts.push(replyData);
      }
    });
  } catch (error) {
    console.log('Something went wrong!', error);
  }
  return replyPosts;
}

export default async function getPostThread(post_id: Required<string>) {
  try {
    const postData = await getPost(post_id);
    assertDefined(postData, 'postData in getPostThread.ts');
    const parentData = await getPostParents(postData.parent_ids);
    const replyData = await getPostReplies(postData.post_id);
    return { postData, parentData, replyData };
  } catch (error) {
    console.log('Something went wrong!', error);
  }
}
