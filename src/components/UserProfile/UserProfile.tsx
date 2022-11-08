import styled from 'styled-components';
import { format } from 'date-fns';
import { InferProps } from 'prop-types';
import { UserType } from '../../Types/PropTypes';
import { Link } from 'react-router-dom';

const StyledUserProfile = styled.div`
  display: grid;
  grid-template-columns: min-content repeat(5, minmax(min-content, 1fr)) min-content;
  grid-template-rows: repeat(13, minmax(1rem, 1.5rem));
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: grey;
`;

const UserBanner = styled.div`
  background: ${(props) => props.user.profile_color};
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

const UserName = styled(Link)`
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

  &:hover {
    text-decoration: underline;
  }
`;

const UserHandle = styled(Link)`
  color: grey;
  text-decoration: none;
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 9;
  grid-row-end: 10;

  &:hover {
    text-decoration: underline;
  }
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

const UserPostCount = styled.p`
  justify-self: center;
  grid-column-start: 7;
  grid-column-end: 8;
  grid-row-start: 11;
  grid-row-end: 12;
  font-weight: bold;
  font-size: 0.75rem;
`;

const UserFollowerCount = styled.p`
  justify-self: center;
  font-size: 0.75rem;
  grid-column-start: 7;
  grid-column-end: 8;
  grid-row-start: 12;
  grid-row-end: 13;
  font-size: 0.75rem;
  font-weight: bold;
`;

const UserFollowingCount = styled.p`
  justify-self: center;
  font-size: 0.75rem;
  grid-column-start: 7;
  grid-column-end: 8;
  grid-row-start: 13;
  grid-row-end: 14;
  font-size: 0.75rem;
  font-weight: bold;
`;

const FollowButton = styled.button`
  color: white;
  background: linear-gradient(
    90deg,
    rgba(0, 255, 255, 1) 0%,
    rgba(255, 0, 255, 1) 100%
  );
  border: none;
  height: 2rem;
  width: 6rem;
  border-radius: 15px;
  transition: 0.2s;
  grid-column-start: 7;
  grid-column-end: 8;
  grid-row-start: 9;
  grid-row-end: 11;
  margin: 0 1rem;
  align-self: center;

  font-size: 1.125rem;
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

const UserProfilePropTypes = {
  user: UserType.isRequired,
};

type UserProfileProps = InferProps<typeof UserProfilePropTypes>;

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <StyledUserProfile>
      <UserBanner user={user} />
      <UserAvatar src={user.avatar}></UserAvatar>
      <UserName to={`/${user.handle}`}>{user.name}</UserName>
      <UserHandle to={`/${user.handle}`}>@{user.handle}666666</UserHandle>
      <UserBlurb>
        {user.blurb}&nbsp;However, this is a test to take up two grid places.
        But just out of curiosity, what if I really pushed my luck and tried to
        fit 3?
      </UserBlurb>
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
