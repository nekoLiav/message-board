import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StyledUserAvatar = styled(Link)`
  grid-row-start: 5;
  grid-row-end: 7;
  margin: 0 1rem;
  grid-column-start: 1;
  min-height: 50px;
  min-width: 50px;
  max-height: 150px;
  max-width: 150px;
`;

const Avatar = styled.img`
  border-radius: 100%;
  border: 2px solid grey;
  min-height: 50px;
  min-width: 50px;
  max-height: 150px;
  max-width: 150px;
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
