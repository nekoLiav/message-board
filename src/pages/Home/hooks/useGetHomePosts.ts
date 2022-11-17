import { useState, useEffect } from 'react';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { postConverter } from 'functions/firestoreDataCoversion';
import { db } from 'config';

export default function useGetHomePosts() {
  const [homePosts, setHomePosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const homePostRefs = query(
        collection(db, 'posts').withConverter(postConverter),
        where('is_reply', '==', false)
      );
      const homePostSnap = await getDocs(homePostRefs);
      homePostSnap.forEach((post) => setHomePosts([...homePosts, post.data()]));
      setIsLoading(false);
    })();
  }, []);

  return { homePosts, isLoading };
}
