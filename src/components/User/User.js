import styled from 'styled-components';
import Header from '../Header';
import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar';
import { useState } from 'react';
import { useEffect } from 'react';
import { getUserPosts } from './getUserPosts';
import Post from '../Post/Post';
import UserInfo from './UserInfo';

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

const UserProfile = styled.div`
  display: grid;
  grid-template-columns: min-content repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
`;

const UserBanner = styled.div`
  background: ${(props) => props.color};
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 4;
`;

const UserPosts = styled.div``;

const UserAside = styled.div``;

const User = (props) => {
  const [userPosts, setUserPosts] = useState();
  const [userPostsLoaded, setUserPostsLoaded] = useState();

  useEffect(() => {
    (async () => {
      const userPostData = await getUserPosts(props.user.id);
      setUserPosts(userPostData);
      setUserPostsLoaded(true);
    })();
  }, []);

  console.log(props);
  return (
    <StyledUser>
      <Header />
      <UserMain>
        <UserProfile>
          <UserBanner color={props.user.profile_color} />
          <UserAvatar avatar={props.user.avatar} handle={props.user.handle} />
          <UserInfo name={props.user.name} handle={props.user.handle} />
        </UserProfile>
        <UserPosts>
          {userPostsLoaded &&
            userPosts.map((post) => <Post key={post.post_id} post={post} />)}
        </UserPosts>
      </UserMain>
      <UserAside />
    </StyledUser>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    handle: PropTypes.string,
    avatar: PropTypes.string,
    profile_color: PropTypes.string,
  }),
};

export default User;
