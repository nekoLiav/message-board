import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostSubmission from '../components/PostSubmission';
import Post from '../components/Post';
import { getHomePosts } from '../functions/getHomePosts';
import { useRouteLoaderData } from 'react-router-dom';
import { Div } from '../styles/Div';
import { isUser } from '../functions/assertUnknowns';

const HomeInfo = styled(Div)`
  display: flex;
  align-items: baseline;
  margin-left: 0.5rem;
`;

const HomeName = styled(Div)`
  font-weight: bold;
  font-size: 1.5rem;
`;

const PostContainer = styled(Div)`
  border-width: 1px 0 0 0;
`;

const Home = () => {
  const [homePosts, setHomePosts] = useState<PostType[]>();
  const clientUser = isUser(useRouteLoaderData('app'));

  useEffect(() => {
    (async () => {
      const homePostData = await getHomePosts();
      setHomePosts(homePostData);
    })();
  }, []);

  return (
    <Div>
      {homePosts && clientUser ? (
        <Div>
          <HomeInfo>
            <HomeName>Home&nbsp;&#x2022;&nbsp;</HomeName>
          </HomeInfo>
          <PostSubmission clientUser={clientUser} />
          <PostContainer>
            {homePosts.map((p) => (
              <Post key={p.post_id} post={p} />
            ))}
          </PostContainer>
        </Div>
      ) : null}
    </Div>
  );
};

export default Home;
