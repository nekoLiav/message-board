import { useQuery } from '@tanstack/react-query';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from 'config';
import { postConverter } from 'functions/firestoreDataCoversion';

export default function useUserPosts(user_id?: string) {
  return useQuery({
    queryKey: ['userPosts', user_id],
    queryFn: async () => {
      const userPostRefs = query(
        collection(db, 'posts').withConverter(postConverter),
        where('user_id', '==', user_id),
        where('is_reply', '==', false)
      );
      const userPostSnap = await getDocs(userPostRefs);
      return userPostSnap.docs.map((doc) => doc.data());
    },
    enabled: !!user_id,
  });
}
