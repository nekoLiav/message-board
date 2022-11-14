import styled from 'styled-components';
import { UserPropType } from '../types/PropTypes';
import format from 'date-fns/format';
import { ProfileContainer } from './Containers';
import { MessageButton, FollowButton } from './Buttons';

const Banner = styled.div<{ profileColor: string }>`
  background: ${(props) => props.profileColor};
  grid-area: 2 / 1 / 8 / 8;
`;

const Avatar = styled.img`
  max-height: 3rem;
  max-width: 3rem;
  max-height: 9rem;
  max-width: 9rem;
  border: 2px solid grey;
  border-radius: 100%;
  margin: 0 1rem;
  grid-area: 5 / 1 / 10 / 2;
`;

const UserName = styled.p`
  font-size: 1rem;
  align-self: center;
  font-weight: bold;
  text-decoration: none;
  color: white;
  grid-column-start: 2;
  grid-column-end: 8;
  grid-row-start: 8;
  grid-row-end: 9;
  overflow: hidden;
  white-space: nowrap;
`;

const UserHandle = styled.p`
  color: grey;
  text-decoration: none;
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 9;
  grid-row-end: 10;
`;

const UserJoined = styled.p`
  font-weight: bold;
  font-size: 0.875rem;
  color: grey;
  grid-column-start: 2;
  grid-column-end: 5;
  grid-row-start: 10;
  grid-row-end: 11;
`;

const UserBlurb = styled.p`
  align-self: center;
  grid-row-start: 11;
  grid-row-end: 14;
  grid-column-start: 1;
  grid-column-end: 6;
  font-size: 0.875rem;
  margin-left: 1rem;
`;

const UserFollowerCount = styled.p`
  justify-self: center;
  font-size: 0.75rem;
  grid-column-start: 7;
  grid-column-end: 8;
  grid-row-start: 11;
  grid-row-end: 12;
  font-size: 0.75rem;
  font-weight: bold;
`;

const UserFollowingCount = styled.p`
  justify-self: center;
  font-size: 0.75rem;
  grid-column-start: 7;
  grid-column-end: 8;
  grid-row-start: 12;
  grid-row-end: 13;
  font-size: 0.75rem;
  font-weight: bold;
`;

const UserPostCount = styled.p`
  justify-self: center;
  grid-column-start: 7;
  grid-column-end: 8;
  grid-row-start: 13;
  grid-row-end: 14;
  font-weight: bold;
  font-size: 0.75rem;
`;

type ProfileProps = {
  user: UserType;
  toggleDM?: () => void;
};

const Profile = ({ user, toggleDM }: ProfileProps) => {
  const {
    profile_color,
    avatar,
    name,
    handle,
    blurb,
    follower_count,
    following_count,
    post_count,
    birthday,
  } = user;

  return (
    <ProfileContainer>
      <Banner profileColor={profile_color} />
      <Avatar src={avatar}></Avatar>
      <UserName>{name}</UserName>
      <UserHandle>@{handle}</UserHandle>
      <UserBlurb>{blurb}</UserBlurb>
      <UserFollowerCount>Followers:&nbsp;{follower_count}</UserFollowerCount>
      <UserFollowingCount>Following:&nbsp;{following_count}</UserFollowingCount>
      <MessageButton onClick={toggleDM}>DM</MessageButton>
      <FollowButton>Follow</FollowButton>
      <UserPostCount>Posts:&nbsp;{post_count}</UserPostCount>
      <UserJoined>
        Joined&nbsp;
        {format(new Date(birthday * 1000), 'MMMM, dd yyyy')}
      </UserJoined>
    </ProfileContainer>
  );
};

Profile.propTypes = {
  user: UserPropType.isRequired,
};

export default Profile;
