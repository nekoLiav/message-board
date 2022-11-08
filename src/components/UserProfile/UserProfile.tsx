import styled from 'styled-components';
import { format } from 'date-fns';
import UserAvatar from './UserAvatar';
import UserInfo from './UserInfo';
import { InferProps } from 'prop-types';
import { UserType } from '../../Types/PropTypes';

const StyledUserProfile = styled.div`
  display: grid;
  grid-template-columns: min-content repeat(5, 1fr);
  grid-template-rows: repeat(12, minmax(25px, 1fr));
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: grey;
  max-height: 300px;
`;

const UserBanner = styled.div`
  background: ${(props) => props.user.profile_color};
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

const UserProfilePropTypes = {
  user: UserType.isRequired,
};

type UserProfileProps = InferProps<typeof UserProfilePropTypes>;

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <StyledUserProfile>
      <UserBanner user={user} />
      <UserAvatar user={user} />
      <UserInfo user={user} />
      <UserBlurb>{user.blurb}</UserBlurb>
      <UserPostCount>{user.post_count}&nbsp;Posts</UserPostCount>
      <UserFollowerCount>
        {user.follower_count}&nbsp;Followers
      </UserFollowerCount>
      <UserFollowingCount>
        {user.following_count}&nbsp;Follows
      </UserFollowingCount>
      <FollowButton>Follow</FollowButton>
      <UserJoined>
        Joined&nbsp;
        {format(new Date(user.birthday * 1000), 'MMMM, dd yyyy')}
      </UserJoined>
    </StyledUserProfile>
  );
};

UserProfile.propTypes = UserProfilePropTypes;

export default UserProfile;
