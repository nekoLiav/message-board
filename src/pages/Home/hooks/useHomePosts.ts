import { query, collection, where, getDocs } from 'firebase/firestore';
import { postConverter } from 'functions/firestoreDataCoversion';
import { db } from 'config';
import { useQuery } from '@tanstack/react-query';

export default function useHomePosts() {
  return useQuery({
    queryKey: ['homePosts'],
    queryFn: async () => {
      const homePostRefs = query(
        collection(db, 'posts').withConverter(postConverter),
        where('is_reply', '==', false)
      );
      const homePostSnap = await getDocs(homePostRefs);
      return homePostSnap.docs.map((doc) => doc.data());
    },
  });
}
