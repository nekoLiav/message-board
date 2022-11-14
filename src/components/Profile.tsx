import styled from 'styled-components';
import { format } from 'date-fns';
import { UserPropType } from '../types/PropTypes';
import { MessageButton, FollowButton } from './Buttons';
import {
  ProfileBlurb,
  ProfileFollowerCount,
  ProfileFollowingCount,
  ProfileHandle,
  ProfileJoined,
  ProfileName,
  ProfilePostCount,
} from './StaticText';
import { ProfileContainer } from './Containers';

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
      <ProfileName>{name}</ProfileName>
      <ProfileHandle>@{handle}</ProfileHandle>
      <ProfileBlurb>{blurb}</ProfileBlurb>
      <ProfileFollowerCount>
        Followers:&nbsp;{follower_count}
      </ProfileFollowerCount>
      <ProfileFollowingCount>
        Following:&nbsp;{following_count}
      </ProfileFollowingCount>
      <MessageButton onClick={toggleDM}>DM</MessageButton>
      <FollowButton>Follow</FollowButton>
      <ProfilePostCount>Posts:&nbsp;{post_count}</ProfilePostCount>
      <ProfileJoined>
        Joined&nbsp;
        {format(new Date(birthday * 1000), 'MMMM, dd yyyy')}
      </ProfileJoined>
    </ProfileContainer>
  );
};

Profile.propTypes = {
  user: UserPropType.isRequired,
};

export default Profile;
