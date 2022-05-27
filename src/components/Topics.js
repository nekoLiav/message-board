import styled from 'styled-components';
import posts from '../posttest.json';
import Post from './Post';

const StyledTopics = styled.div`
  display: flex;
  flex-direction: column;
  background: #222222;
  border: 1px solid white;
  width: 100%;
  padding: 1rem 1rem 0 1rem;
`;

const TopicsHeader = styled.h1`
  border: 1px solid white;
  color: white;
  padding: 0.5rem;
`;

const TopicsList = styled.div`
  border: 1px solid white;
  height: 100%;
`;

const postArray = posts.posts;

const Topics = () => {
  return (
    <StyledTopics>
      <TopicsHeader>Popular</TopicsHeader>
      <TopicsList>
        {postArray.map((post) => (
          <Post
            key={Date.now()}
            title={post.title}
            time={post.time}
            user={post.user}
          />
        ))}
      </TopicsList>
    </StyledTopics>
  );
};

export default Topics;
