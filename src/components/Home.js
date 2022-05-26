import styled from 'styled-components';

const StyledHome = styled.div`
  display: flex;
  height: 100%;
  border: 1px solid white;
`;

const ServersContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #222222;
  border: 1px solid white;
  width: 15rem;
`;

const ServersHeader = styled.h1`
  border: 1px solid white;
  color: white;
  text-align: center;
`;

const ServerList = styled.div`
  border: 1px solid white;
  height: 100%;
`;

const ConversationsContainer = styled(ServersContainer)``;

const ConversationsHeader = styled(ServersHeader)``;

const ConversationList = styled(ServerList)``;

const Home = () => {
  return (
    <StyledHome>
      <ServersContainer>
        <ServersHeader>Servers</ServersHeader>
        <ServerList />
      </ServersContainer>
      <ConversationsContainer>
        <ConversationsHeader>Conversations</ConversationsHeader>
        <ConversationList />
      </ConversationsContainer>
    </StyledHome>
  );
};

export default Home;
