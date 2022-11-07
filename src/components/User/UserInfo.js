import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 50px;
  grid-column-start: 1;
  grid-row-start: 11;
  grid-row-end: 12;
  margin: 0 1rem;
`;

const UserName = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: white;
  font-size: 1.25rem;
  min-height: 25px;

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
