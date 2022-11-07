import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 5;
  griw-row-end: 6;
  justify-content: center;
  align-items: center;
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

const UserInfo = (props) => {
  return (
    <StyledUserInfo>
      <UserName to={`/${props.handle}`}>{props.name}&nbsp;</UserName>
      <UserHandle to={`/${props.handle}`}>
        {`@${props.handle}`}&nbsp;
      </UserHandle>
    </StyledUserInfo>
  );
};

UserInfo.propTypes = {
  name: PropTypes.string,
  handle: PropTypes.string,
};

export default UserInfo;
