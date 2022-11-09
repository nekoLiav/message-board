import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostSubmission from '../components/PostSubmission/PostSubmission';
import { InferProps } from 'prop-types';
import PostUser from '../components/Post/PostUser';
import Post from '../components/Post/Post';
import { getHomePosts } from '../components/Home/getHomePosts';
import { UserType } from '../Types/PropTypes';
import { useRouteLoaderData } from 'react-router-dom';
import { Div } from '../Styles/Div';

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

type DataTypes = {
  user: InferProps<typeof UserType>;
};

const Home = () => {
  const [homePosts, setHomePosts] = useState([]);
  const [homeUpdated, setHomeUpdated] = useState(false);
  const userData: DataTypes['user'] = useRouteLoaderData('app');

  useEffect(() => {
    (async () => {
      const homePostData = await getHomePosts();
      setHomePosts(homePostData);
      setHomeUpdated(true);
    })();
  }, []);

  return (
    <Div>
      {homeUpdated ? (
        <Div>
          <HomeInfo>
            <HomeName>Home&nbsp;&#x2022;&nbsp;</HomeName>
            <PostUser user={userData} />
          </HomeInfo>
          <PostSubmission user={userData} />
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
