import { useEffect, useState } from 'react';
import styled from 'styled-components';
import postsjson from '../posttest.json';
import Post from './Post';

const StyledTopics = styled.div`
  display: flex;
  flex-direction: column;
  background: #222222;
  border: 1px solid white;
  width: 100%;
  padding: 1rem 1rem 1rem 1rem;
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

const Topics = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(postsjson.posts);
  }, []);

  return (
    <StyledTopics>
      <TopicsHeader>Popular</TopicsHeader>
      <TopicsList>
        {posts.map((post) => (
          <Post key={post.time} post={post} />
        ))}
      </TopicsList>
    </StyledTopics>
  );
};

export default Topics;
