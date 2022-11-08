import styled from 'styled-components';
import { InferProps } from 'prop-types';
import { Link } from 'react-router-dom';
import { UserType } from '../../Types/PropTypes';

const StyledPostAvatar = styled(Link)`
  max-height: 3rem;
  max-width: 3rem;
  max-height: 3rem;
  max-width: 3rem;
`;
const Avatar = styled.img`
  max-height: 3rem;
  max-width: 3rem;
  max-height: 3rem;
  max-width: 3rem;
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
