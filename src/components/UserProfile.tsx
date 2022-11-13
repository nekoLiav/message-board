import styled from 'styled-components';
import { format } from 'date-fns';
import { UserPropType } from '../types/PropTypes';
import { Div } from '../styles/Div';
import { MessageButton, FollowButton } from '../components/Buttons';

const StyledUserProfile = styled(Div)`
  display: grid;
  grid-template-columns: min-content repeat(5, minmax(min-content, 1fr)) min-content;
  grid-template-rows: repeat(13, minmax(1rem, 1.5rem));
`;

const UserBanner = styled(Div)<{ profileColor: string }>`
  background: ${(props) => props.profileColor};
  grid-column-start: 1;
  grid-column-end: 8;
  grid-row-start: 2;
  grid-row-end: 8;
`;

const UserAvatar = styled.img`
  max-height: 3rem;
  max-width: 3rem;
  max-height: 9rem;
  max-width: 9rem;
  border-radius: 100%;
  border: 2px solid grey;
  grid-row-start: 5;
  grid-row-end: 10;
  grid-column-start: 1;
  grid-column-end: 2;
  margin: 0 1rem;
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
      <UserName>{name}</UserName>
      <UserHandle>@{handle}</UserHandle>
      <UserBlurb>{blurb}</UserBlurb>
      <UserFollowerCount>Followers:&nbsp;{follower_count}</UserFollowerCount>
      <UserFollowingCount>Following:&nbsp;{following_count}</UserFollowingCount>
      <MessageButton onClick={toggleDM} small>
        DM
      </MessageButton>
      <FollowButton>Follow</FollowButton>
      <UserPostCount>Posts:&nbsp;{post_count}</UserPostCount>
      <UserJoined>
        Joined&nbsp;
        {format(new Date(birthday * 1000), 'MMMM, dd yyyy')}
      </UserJoined>
    </StyledUserProfile>
  );
};

UserProfile.propTypes = {
  user: UserPropType.isRequired,
};

export default UserProfile;
