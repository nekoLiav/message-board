import { useState, useEffect } from 'react';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { postConverter } from 'functions/firestoreDataCoversion';
import { db } from 'config';

export default function useGetHomePosts() {
  const [homePosts, setHomePosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const homePostRefs = query(
        collection(db, 'posts').withConverter(postConverter),
        where('is_reply', '==', false)
      );
      const homePostSnap = await getDocs(homePostRefs);
      setHomePosts(homePostSnap.docs.map((doc) => doc.data()));
      setIsLoading(false);
    })();
  }, []);

  return { homePosts, isLoading };
}
