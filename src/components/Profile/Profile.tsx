import { UserPropType } from '../../types/PropTypes';
import format from 'date-fns/format';
import {
  ProfileContainer,
  Banner,
  Avatar,
  Name,
  Handle,
  Blurb,
  FollowerCount,
  FollowingCount,
  PostCount,
  Joined,
  MessageButton,
  FollowButton,
} from './style';

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
      <Name>{name}</Name>
      <Handle>@{handle}</Handle>
      <Blurb>{blurb}</Blurb>
      <FollowerCount>Followers:&nbsp;{follower_count}</FollowerCount>
      <FollowingCount>Following:&nbsp;{following_count}</FollowingCount>
      <MessageButton onClick={toggleDM}>DM</MessageButton>
      <FollowButton>Follow</FollowButton>
      <PostCount>Posts:&nbsp;{post_count}</PostCount>
      <Joined>
        Joined&nbsp;
        {format(new Date(birthday * 1000), 'MMMM, dd yyyy')}
      </Joined>
    </ProfileContainer>
  );
};

Profile.propTypes = {
  user: UserPropType.isRequired,
};

export default Profile;
