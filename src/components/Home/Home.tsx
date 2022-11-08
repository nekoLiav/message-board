import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../Header';
import PostSubmission from '../PostSubmission/PostSubmission';
import { InferProps } from 'prop-types';
import PostUser from '../Post/PostUser';
import Post from '../Post/Post';
import { getHomePosts } from './getHomePosts';
import { UserType } from '../../Types/PropTypes';

const StyledHome = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr minmax(min-content, 600px) 1fr;
  height: 100%;
  background: black;
  overflow: auto;
  color: white;
`;

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

const HomeAside = styled.div``;

const HomePropTypes = {
  user: UserType,
};

type HomeProps = InferProps<typeof HomePropTypes>;

const Home = ({ user }: HomeProps) => {
  const [homePosts, setHomePosts] = useState([]);
  const [homeUpdated, setHomeUpdated] = useState(false);

  useEffect(() => {
    (async () => {
      const homePostData = await getHomePosts();
      setHomePosts(homePostData);
      setHomeUpdated(true);
    })();
  }, []);

  return (
    <StyledHome>
      <Header />
      {homeUpdated ? (
        <HomeMain>
          <HomeInfo>
            <HomeName>Home&nbsp;&#x2022;&nbsp;</HomeName>
            <PostUser user={user} />
          </HomeInfo>
          <PostSubmission user={user} />
          <HomePosts>
            {homePosts.map((p) => (
              <Post key={p.post_id} post={p} />
            ))}
          </HomePosts>
        </HomeMain>
      ) : null}
      <HomeAside />
    </StyledHome>
  );
};

Home.propTypes = HomePropTypes;

export default Home;
