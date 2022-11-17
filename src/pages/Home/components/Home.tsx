import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
import { useRouteLoaderData } from 'react-router-dom';
import { isUser } from 'functions/assertUnknowns';
import { HomeContainer } from './style';
import useGetHomePosts from '../hooks/useGetHomePosts';

export const Home = () => {
  const { homePosts, isLoading } = useGetHomePosts();
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
