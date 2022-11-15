import { useEffect, useState } from 'react';
import PostSubmission from '../../components/PostSubmission/PostSubmission';
import Content from '../../components/Post/Content';
import getHomePosts from '../../functions/getHomePosts';
import { useRouteLoaderData } from 'react-router-dom';
import { isUser } from '../../functions/assertUnknowns';
import { HomeContainer } from './style';

const Home = () => {
  const [homePosts, setHomePosts] = useState<PostType[]>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const clientUser = isUser(useRouteLoaderData('app'));

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const homePostData = await getHomePosts();
      setHomePosts(homePostData);
      setIsLoading(false);
    })();
  }, []);

  if (!isLoading) {
    return (
      <HomeContainer>
        <PostSubmission clientUser={clientUser} />
        {homePosts &&
          homePosts.map((p) => <Content key={p.post_id} content={p} />)}
      </HomeContainer>
    );
  }
  return null;
};

export default Home;
