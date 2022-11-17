import { HomeContainer } from './style';
import { Content } from 'features/Content';
import { useQuery } from '@tanstack/react-query';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from 'config';
import { postConverter } from 'functions/firestoreDataCoversion';
import { Loading } from 'pages/Loading';

export const Home = () => {
  const { isLoading, isError, data, error } = useQuery({
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

  if (isLoading) {
    <Loading />;
  }

  if (isError) {
    console.log(error);
  }

  return (
    <HomeContainer>
      {data && data.map((p) => <Content key={p.post_id} content={p} />)}
    </HomeContainer>
  );
};
