import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StyledPostAvatar = styled(Link)`
  width: 50px;
  height: 50px;
`;
const Avatar = styled.img`
  width: 50px;
  border-radius: 100%;
`;

const PostAvatar = (props) => {
  return (
    <StyledPostAvatar to={`/${props.handle}`}>
      <Avatar src={props.avatar} />
    </StyledPostAvatar>
  );
};

PostAvatar.propTypes = {
  handle: PropTypes.string,
  avatar: PropTypes.string,
};

export default PostAvatar;
