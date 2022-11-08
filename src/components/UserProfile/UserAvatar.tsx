import styled from 'styled-components';
import { InferProps } from 'prop-types';
import { UserType } from '../../Types/PropTypes';

const StyledUserAvatar = styled.img`
  min-height: 50px;
  min-width: 50px;
  max-height: 150px;
  max-width: 150px;
  border-radius: 100%;
  border: 2px solid grey;
  grid-row-start: 5;
  grid-row-end: 7;
  grid-column-start: 1;
  margin: 0 1rem;
`;

const UserAvatarPropTypes = {
  user: UserType.isRequired,
};

type UserAvatarProps = InferProps<typeof UserAvatarPropTypes>;

const UserAvatar = ({ user }: UserAvatarProps) => {
  return <StyledUserAvatar src={user.avatar}></StyledUserAvatar>;
};

UserAvatar.propTypes = UserAvatarPropTypes;

export default UserAvatar;
