import { useQuery } from '@tanstack/react-query';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from 'config';
import { userConverter } from 'functions/firestoreDataCoversion';

export default function useUserProfile(handle?: string) {
  return useQuery({
    queryKey: ['userProfile', handle],
    queryFn: async () => {
      const userRef = query(
        collection(db, 'users').withConverter(userConverter),
        where('handle', '==', handle)
      );
      const userSnap = await getDocs(userRef);
      return userSnap.docs[0].data();
    },
  });
}
