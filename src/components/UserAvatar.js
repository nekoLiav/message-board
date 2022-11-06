import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StyledUserAvatar = styled(Link)`
  width: 50px;
  height: 50px;
`;
const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

const UserAvatar = (props) => {
  return (
    <StyledUserAvatar to="/">
      <Avatar src={props.src} />
    </StyledUserAvatar>
  );
};

UserAvatar.propTypes = {
  src: PropTypes.string,
};

export default UserAvatar;
