import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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

const PostUser = (props) => {
  return (
    <StyledPostUser>
      <UserName to={`/${props.handle}`}>{props.name}&nbsp;</UserName>
      <UserHandle to={`/${props.handle}`}>{props.handle}&nbsp;</UserHandle>
    </StyledPostUser>
  );
};

PostUser.propTypes = {
  name: PropTypes.string,
  handle: PropTypes.string,
};

export default PostUser;
