import styled from 'styled-components';
import { InferProps } from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { getUserPosts } from '../components/User/getUserPosts';
import Post from '../components/Post/Post';
import UserProfile from '../components/User/UserProfile';
import { UserType } from '../Types/PropTypes';

const StyledUser = styled.div``;

const UserMain = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 0 1px 0 1px;
  border-style: solid;
  border-color: grey;
`;

const UserPosts = styled.div``;

const UserPropTypes = {
  user: UserType,
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
      <UserMain>
        <UserProfile user={user} />
        <UserPosts>
          {userPostsLoaded &&
            userPosts.map((post) => <Post key={post.post_id} post={post} />)}
        </UserPosts>
      </UserMain>
    </StyledUser>
  );
};

User.propTypes = UserPropTypes;

export default User;
