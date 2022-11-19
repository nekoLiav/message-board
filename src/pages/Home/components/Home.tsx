import { useLoaderData } from 'react-router-dom';
import { HomeContainer } from './style';
import { Content } from 'features/Content';
import { isLoader } from '../types/isLoader';
import { isPost } from '../types/isPost';

export const Home = () => {
  const loader = useLoaderData();

  if (isLoader(loader) && loader.posts) {
    return (
      <HomeContainer>
        {loader.posts.map((post) => {
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
