import styled from 'styled-components';
import { InferProps } from 'prop-types';
import { Link } from 'react-router-dom';
import { UserType } from '../../Types/PropTypes';

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

const UserInfoPropTypes = {
  user: UserType.isRequired,
};

type UserInfoProps = InferProps<typeof UserInfoPropTypes>;

const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <StyledUserInfo>
      <UserName to={`/${user.handle}`}>{user.name}&nbsp;</UserName>
      <UserHandle to={`/${user.handle}`}>{`@${user.handle}`}&nbsp;</UserHandle>
    </StyledUserInfo>
  );
};

UserInfo.propTypes = UserInfoPropTypes;

export default UserInfo;
