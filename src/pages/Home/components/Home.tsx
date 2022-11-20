import { HomeContainer } from './style';
import { Content } from 'features/Content';
import { ContentSubmission } from 'features/ContentSubmission';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';

type AppLoader = {
  currentUser?: UserType;
};

type HomeLoader = {
  homePosts?: PostType[];
};

export const Home = () => {
  const { currentUser } = useRouteLoaderData('app') as AppLoader;
  const { homePosts } = useLoaderData() as HomeLoader;

  return (
    <HomeContainer>
      {currentUser && <ContentSubmission currentUser={currentUser} />}
      {homePosts &&
        homePosts.map((post) => <Content key={post.post_id} content={post} />)}
    </HomeContainer>
  );
};
