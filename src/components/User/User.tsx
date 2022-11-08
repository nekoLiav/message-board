import styled from 'styled-components';
import Header from '../Header';
import { InferProps } from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { getUserPosts } from './getUserPosts';
import Post from '../Post/Post';
import UserProfile from './UserProfile';
import { UserType } from '../../Types/PropTypes';

const StyledUser = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr minmax(min-content, 600px) 1fr;
  height: 100%;
  background: black;
  overflow: auto;
  color: white;
`;

const UserMain = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 0 1px 0 1px;
  border-style: solid;
  border-color: grey;
`;

const UserPosts = styled.div``;

const UserAside = styled.div``;

const UserPropTypes = {
  user: UserType.isRequired,
};

type UserProps = InferProps<typeof UserPropTypes>;

const User = ({ user }: UserProps) => {
  const [userPosts, setUserPosts] = useState([]);
  const [userPostsLoaded, setUserPostsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const userPostData = await getUserPosts(user.id);
      setUserPosts(userPostData);
      setUserPostsLoaded(true);
    })();
  }, []);

  return (
    <StyledUser>
      <Header />
      <UserMain>
        <UserProfile user={user} />
        <UserPosts>
          {userPostsLoaded &&
            userPosts.map((post) => <Post key={post.post_id} post={post} />)}
        </UserPosts>
      </UserMain>
      <UserAside />
    </StyledUser>
  );
};

User.propTypes = UserPropTypes;

export default User;
