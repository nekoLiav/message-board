import styled from 'styled-components';
import { InferProps } from 'prop-types';
import { Link } from 'react-router-dom';
import { UserType } from '../../Types/PropTypes';

const StyledPostAvatar = styled(Link)`
  width: 50px;
  height: 50px;
`;
const Avatar = styled.img`
  width: 50px;
  border-radius: 100%;
`;

const PostAvatarPropTypes = {
  user: UserType,
};

type PostAvatarProps = InferProps<typeof PostAvatarPropTypes>;

const PostAvatar = ({ user }: PostAvatarProps) => {
  return (
    <StyledPostAvatar to={`/${user.handle}`}>
      <Avatar src={user.avatar} />
    </StyledPostAvatar>
  );
};

PostAvatar.propTypes = PostAvatarPropTypes;

export default PostAvatar;
