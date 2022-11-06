import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StyledPostAvatar = styled(Link)`
  width: 50px;
  height: 50px;
`;
const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

const PostAvatar = (props) => {
  return (
    <StyledPostAvatar to={`/${props.handle}`}>
      <Avatar src={props.src} />
    </StyledPostAvatar>
  );
};

PostAvatar.propTypes = {
  handle: PropTypes.string,
  src: PropTypes.string,
};

export default PostAvatar;
