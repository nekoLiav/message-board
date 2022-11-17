import { HomeContainer } from './style';
import { Content } from 'features/Content';
import useHomePosts from '../hooks/useHomePosts';
import { Loading } from 'pages/Loading';

export const Home = () => {
  const { status, data, error } = useHomePosts();

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return <Loading />;
  }

  return (
    <HomeContainer>
      {data.map((post) => (
        <Content key={post.post_id} content={post} />
      ))}
    </HomeContainer>
  );
};
