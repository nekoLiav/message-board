import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostSubmission from '../components/PostSubmission';
import Post from '../components/Post';
import { getHomePosts } from '../functions/getHomePosts';
import { useRouteLoaderData } from 'react-router-dom';
import { Div } from '../styles/Div';
import { isUser } from '../functions/assertUnknowns';

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
      {homePosts && (
        <Div>
          <PostSubmission clientUser={clientUser} />
          <PostContainer>
            {homePosts.map((p) => (
              <Post key={p.post_id} post={p} />
            ))}
          </PostContainer>
        </Div>
      )}
    </Div>
  );
};

export default Home;
