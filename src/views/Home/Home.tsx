import { ContentSubmission } from '@/features/ContentSubmission';
import { Content } from '@/features/Content';
import { useRouteLoaderData } from 'react-router-dom';
import { isUser } from '@/functions/assertUnknowns';
import { HomeContainer } from './style';
import useHomePosts from '@/hooks/useHomePosts';

const Home = () => {
  const { homePosts, isLoading } = useHomePosts();
  const clientUser = isUser(useRouteLoaderData('app'));

  if (!isLoading) {
    return (
      <HomeContainer>
        <ContentSubmission clientUser={clientUser} />
        {homePosts.map((p) => (
          <Content key={p.post_id} content={p} />
        ))}
      </HomeContainer>
    );
  }
  return null;
};

export default Home;
