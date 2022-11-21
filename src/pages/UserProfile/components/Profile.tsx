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
  Info,
  Engagement,
} from './style';
import { UserPropType } from 'types/PropTypes';

type ProfileProps = {
  user: UserType;
  toggleDM?: () => void;
};

export const Profile = ({ user, toggleDM }: ProfileProps) => {
  const {
    profile_color,
    avatar,
    name,
    handle,
    blurb,
    post_count,
    follower_count,
    following_count,
    birthday,
  } = user;

  return (
    <ProfileContainer>
      <Banner profileColor={profile_color} />
      <Avatar src={avatar}></Avatar>
      <Info>
        <Name>{name}</Name>
        <Handle>@{handle}</Handle>
        <Joined>
          Joined&nbsp;
          {format(new Date(birthday * 1000), 'MMMM, dd yyyy')}
        </Joined>
      </Info>
      <Blurb>{blurb}</Blurb>
      <Engagement>
        <FollowerCount>Followers:&nbsp;{follower_count}</FollowerCount>
        <FollowingCount>Following:&nbsp;{following_count}</FollowingCount>
        <PostCount>Posts:&nbsp;{post_count}</PostCount>
      </Engagement>
      <MessageButton onClick={toggleDM}>DM</MessageButton>
      <FollowButton>Follow</FollowButton>
    </ProfileContainer>
  );
};

Profile.propTypes = {
  user: UserPropType.isRequired,
};
