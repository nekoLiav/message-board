/* eslint-disable no-unused-vars */
import styled from 'styled-components';

const StyledUser = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr minmax(min-content, 600px) 1fr;
  height: 100%;
  background: black;
  overflow: auto;
  color: white;
`;

const UserMain = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 0 1px 0 1px;
  border-style: solid;
  border-color: grey;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: baseline;
  height: 27px;
`;

const UserName = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
`;

const UserPosts = styled.div``;

const UserAside = styled.div``;

const User = (props) => {
  return <StyledUser></StyledUser>;
};

export default User;
