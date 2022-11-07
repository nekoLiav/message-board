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
  grid-template-columns: min-content repeat(3, 1fr);
  grid-template-rows: repeat(8, minmax(1rem, 1fr));
  max-height: 300px;
`;

const UserBanner = styled.div`
  background: ${(props) => props.color};
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 2;
  grid-row-end: 6;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  grid-row-start: 3;
  grid-row-end: 9;
  grid-column-start: 1;
  grid-column-end: 1;
`;

const UserBlurb = styled.p`
  align-self: center;
  grid-row-start: 6;
  grid-row-end: 7;
  grid-column-start: 2;
  grid-column-end: 6;
`;

const UserPostCount = styled.p`
  align-self: center;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 8;
  grid-row-end: 9;
`;

const UserFollowerCount = styled.p`
  align-self: center;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 8;
  grid-row-end: 9;
`;

const UserFollowingCount = styled.p`
  align-self: center;
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 8;
  grid-row-end: 9;
`;

const FollowButton = styled.button`
  align-self: center;
  color: white;
  background: linear-gradient(
    90deg,
    rgba(0, 255, 255, 1) 0%,
    rgba(255, 0, 255, 1) 100%
  );
  border: none;
  height: 30px;
  width: 100px;
  border-radius: 15px;
  transition: 0.2s;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 7;
  grid-row-end: 8;

  font-size: 1.2rem;

  &:hover {
    cursor: pointer;
    filter: brightness(110%);
  }
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

  return (
    <StyledUser>
      <Header />
      <UserMain>
        <UserProfile>
          <UserBanner color={props.user.profile_color} />
          <UserContainer>
            <UserAvatar avatar={props.user.avatar} handle={props.user.handle} />
            <UserInfo name={props.user.name} handle={props.user.handle} />
          </UserContainer>
          <UserBlurb>{props.user.blurb}</UserBlurb>
          <UserPostCount>{props.user.post_count}&nbsp;Posts</UserPostCount>
          <UserFollowerCount>
            {props.user.follower_count}&nbsp;Followers
          </UserFollowerCount>
          <UserFollowingCount>
            {props.user.following_count}&nbsp;Follows
          </UserFollowingCount>
          <FollowButton>Follow</FollowButton>
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
    blurb: PropTypes.string,
    profile_color: PropTypes.string,
    post_count: PropTypes.number,
    follower_count: PropTypes.number,
    following_count: PropTypes.number,
  }),
};

export default User;
