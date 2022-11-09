import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostSubmission from '../components/PostSubmission/PostSubmission';
import { InferProps } from 'prop-types';
import PostUser from '../components/Post/PostUser';
import Post from '../components/Post/Post';
import { getHomePosts } from '../components/Home/getHomePosts';
import { UserType } from '../Types/PropTypes';
import { useRouteLoaderData } from 'react-router-dom';

const StyledHome = styled.div``;

const HomeMain = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 0 1px 0 1px;
  border-style: solid;
  border-color: grey;
`;

const HomeInfo = styled.div`
  display: flex;
  align-items: baseline;
  height: 27px;
`;

const HomeName = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
`;

const HomePosts = styled.div``;

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
    <StyledHome>
      {homeUpdated ? (
        <HomeMain>
          <HomeInfo>
            <HomeName>Home&nbsp;&#x2022;&nbsp;</HomeName>
            <PostUser user={userData} />
          </HomeInfo>
          <PostSubmission user={userData} />
          <HomePosts>
            {homePosts.map((p) => (
              <Post key={p.post_id} post={p} />
            ))}
          </HomePosts>
        </HomeMain>
      ) : null}
    </StyledHome>
  );
};

export default Home;
