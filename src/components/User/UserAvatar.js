import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StyledUserAvatar = styled(Link)`
  width: 100px;
  height: 100px;
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 3;
  grid-row-end: 5;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.img`
  width: 100px;
  border-radius: 100%;
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
