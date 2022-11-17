import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRouteLoaderData } from 'react-router-dom';
import { isUser } from '../functions/assertUnknowns';
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../functions/firebase-config';
import { postConverter } from '../functions/firestoreDataCoversion';

export default function usePostThread() {
  const [post, setPost] = useState<PostType>();
  const [parents, setParents] = useState<PostType[]>([]);
  const [replies, setReplies] = useState<PostType[]>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const clientUser = isUser(useRouteLoaderData('app'));
  const { post_id } = useParams();

  async function getPost() {
    if (post_id) {
      const postRef = doc(db, 'posts', post_id).withConverter(postConverter);
      const postSnap = await getDoc(postRef);
      return postSnap.data();
    }
  }

  async function getParents(parent_ids: string[]) {
    const temp: PostType[] = [];
    parent_ids.forEach(async (parent_id) => {
      const parentRef = doc(db, 'posts', parent_id).withConverter(
        postConverter
      );
      const parentSnap = await getDoc(parentRef);
      if (parentSnap.exists()) {
        temp.push(parentSnap.data());
      }
    });
    return temp;
  }

  async function getReplies(post_id: string) {
    const replyRefs = query(
      collection(db, 'posts').withConverter(postConverter),
      where('direct_parent', '==', post_id)
    );
    const replySnap = await getDocs(replyRefs);
    return replySnap.docs.map((doc) => doc.data());
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const postData = await getPost();
      setPost(postData);
      if (postData) {
        const parentData = await getParents(postData.parent_ids);
        setParents(parentData);
        const replyData = await getReplies(postData.post_id);
        setReplies(replyData);
        setIsLoading(false);
      }
    })();
  }, [post_id]);

  return { post, parents, replies, isLoading, clientUser };
}
