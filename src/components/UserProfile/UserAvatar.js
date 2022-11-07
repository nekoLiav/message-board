import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledUserAvatar = styled.img`
  min-height: 50px;
  min-width: 50px;
  max-height: 150px;
  max-width: 150px;
  border-radius: 100%;
  border: 2px solid grey;
  grid-row-start: 5;
  grid-row-end: 7;
  grid-column-start: 1;
  margin: 0 1rem;
`;

const UserAvatar = (props) => {
  return <StyledUserAvatar src={props.avatar}></StyledUserAvatar>;
};

UserAvatar.propTypes = {
  avatar: PropTypes.string,
};

export default UserAvatar;
