import styled from 'styled-components';
import Header from '../Header';
import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar';
import { useState } from 'react';
import { useEffect } from 'react';
import { getUserPosts } from './getUserPosts';
import Post from '../Post/Post';
import UserInfo from './UserInfo';
import { format } from 'date-fns';

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
  grid-template-columns: min-content repeat(5, 1fr);
  grid-template-rows: repeat(12, minmax(25px, 1fr));
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: grey;
  max-height: 300px;
`;

const UserBanner = styled.div`
  background: ${(props) => props.color};
  grid-column-start: 1;
  grid-column-end: 7;
  grid-row-start: 2;
  grid-row-end: 8;
`;

const UserBlurb = styled.p`
  align-self: center;
  grid-row-start: 8;
  grid-row-end: 9;
  grid-column-start: 2;
  grid-column-end: 7;
`;

const UserPostCount = styled.p`
  align-self: center;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 12;
  grid-row-end: 13;
  font-size: 0.75rem;
  font-weight: bold;
  color: grey;
`;

const UserFollowerCount = styled.p`
  align-self: center;
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 12;
  grid-row-end: 13;
  font-size: 0.75rem;
  font-weight: bold;
  color: grey;
`;

const UserFollowingCount = styled.p`
  align-self: center;
  grid-column-start: 6;
  grid-column-end: 7;
  grid-row-start: 12;
  grid-row-end: 13;
  font-size: 0.75rem;
  font-weight: bold;
  color: grey;
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
  grid-column-end: 4;
  grid-row-start: 10;
  grid-row-end: 11;

  font-size: 1.25rem;
  font-weight: bold;
  text-shadow: 1px 1px 5px #333333;

  &:hover {
    cursor: pointer;
    filter: brightness(110%);
  }

  &:active {
    filter: brightness(90%);
  }
`;

const UserJoined = styled.p`
  color: grey;
  font-weight: bold;
  font-size: 0.75rem;
  grid-column-start: 5;
  grid-column-end: 7;
  grid-row-start: 10;
  grid-row-end: 11;
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
          <UserAvatar avatar={props.user.avatar} handle={props.user.handle} />
          <UserInfo name={props.user.name} handle={props.user.handle} />
          <UserBlurb>{props.user.blurb}</UserBlurb>
          <UserPostCount>{props.user.post_count}&nbsp;Posts</UserPostCount>
          <UserFollowerCount>
            {props.user.follower_count}&nbsp;Followers
          </UserFollowerCount>
          <UserFollowingCount>
            {props.user.following_count}&nbsp;Follows
          </UserFollowingCount>
          <FollowButton>Follow</FollowButton>
          <UserJoined>
            Joined&nbsp;
            {format(new Date(props.user.birthday * 1000), 'MMMM, dd yyyy')}
          </UserJoined>
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
    birthday: PropTypes.number,
  }),
};

export default User;
