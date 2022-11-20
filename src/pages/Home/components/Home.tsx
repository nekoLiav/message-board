import { HomeContainer } from './style';
import { Content } from 'features/Content';
import { isHomeLoader } from '../types/isHomeLoader';
import { isPost } from 'types/isPost';
import { isAppLoader } from 'types/isAppLoader';
import { isUser } from 'types/isUser';
import { ContentSubmission } from 'features/ContentSubmission';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';

export const Home = () => {
  const appLoader = useRouteLoaderData('app');

  const homeLoader = useLoaderData();

  if (isAppLoader(appLoader) && isHomeLoader(homeLoader)) {
    return (
      <HomeContainer>
        {isUser(appLoader.currentUser) && (
          <ContentSubmission currentUser={appLoader.currentUser} />
        )}
        {homeLoader.homePosts &&
          homeLoader.homePosts.map((post) => {
            if (isPost(post)) {
              return <Content key={post.post_id} content={post} />;
            } else {
              return null;
            }
          })}
      </HomeContainer>
    );
  }

  return null;
};
