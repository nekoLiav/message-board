import styled from 'styled-components';
import { format } from 'date-fns';
import { UserPropType } from '../types/PropTypes';
import { Div } from '../styles/Div';
import { MessageButton, FollowButton } from '../components/Buttons';
import {
  ProfileBlurb,
  ProfileFollowerCount,
  ProfileFollowingCount,
  ProfileHandle,
  ProfileJoined,
  ProfileName,
  ProfilePostCount,
} from './StaticText';

const StyledUserProfile = styled(Div)`
  display: grid;
  grid-template-columns: min-content repeat(5, minmax(min-content, 1fr)) min-content;
  grid-template-rows: repeat(13, minmax(1rem, 1.5rem));
`;

const UserBanner = styled(Div)<{ profileColor: string }>`
  background: ${(props) => props.profileColor};
  grid-area: 2 / 1 / 8 / 8;
`;

const UserAvatar = styled.img`
  max-height: 3rem;
  max-width: 3rem;
  max-height: 9rem;
  max-width: 9rem;
  border: 2px solid grey;
  border-radius: 100%;
  margin: 0 1rem;
  grid-area: 5 / 1 / 10 / 2;
`;

type UserProfileProps = {
  user: UserType;
  toggleDM?: () => void;
};

const UserProfile = ({ user, toggleDM }: UserProfileProps) => {
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
    <StyledUserProfile>
      <UserBanner profileColor={profile_color} />
      <UserAvatar src={avatar}></UserAvatar>
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
    </StyledUserProfile>
  );
};

UserProfile.propTypes = {
  user: UserPropType.isRequired,
};

export default UserProfile;
