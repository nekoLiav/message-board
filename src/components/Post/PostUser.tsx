import styled from 'styled-components';
import { InferProps } from 'prop-types';
import { Link } from 'react-router-dom';
import { UserType } from '../../Types/PropTypes';

const StyledPostUser = styled.div`
  display: flex;
`;

const UserName = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: white;

  &:hover {
    text-decoration: underline;
  }
`;

const UserHandle = styled(Link)`
  color: grey;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const PostUserPropTypes = {
  user: UserType.isRequired,
};

type PostUserProps = InferProps<typeof PostUserPropTypes>;

const PostUser = ({ user }: PostUserProps) => {
  return (
    <StyledPostUser>
      <UserName to={`/${user.handle}`}>{user.name}&nbsp;</UserName>
      <UserHandle to={`/${user.handle}`}>{`@${user.handle}`}&nbsp;</UserHandle>
    </StyledPostUser>
  );
};

PostUser.propTypes = PostUserPropTypes;

export default PostUser;
