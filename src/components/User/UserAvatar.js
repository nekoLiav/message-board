import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StyledUserAvatar = styled(Link)`
  width: 150px;
  height: 150px;
`;

const Avatar = styled.img`
  width: 150px;
  border-radius: 100%;
  border: 2px solid grey;
`;

const UserAvatar = (props) => {
  return (
    <StyledUserAvatar to={`/${props.handle}`}>
      <Avatar src={props.avatar} />
    </StyledUserAvatar>
  );
};

UserAvatar.propTypes = {
  handle: PropTypes.string,
  avatar: PropTypes.string,
  big: PropTypes.bool,
};

export default UserAvatar;
