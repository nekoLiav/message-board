import styled from 'styled-components';
import postjson from '../posttest.json';
import { useState, useEffect } from 'react';

const StyledThreadButtons = styled.div`
  display: flex;
  border: 1px solid white;
  gap: 0.5rem;
`;

const StyledThreadButton = styled.p`
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0.2rem;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const ThreadButtons = () => {
  const [comments, setComments] = useState(0);

  useEffect(() => {
    setComments(postjson.posts[0].comments);
  }, []);

  return (
    <StyledThreadButtons>
      <StyledThreadButton>{`${comments}`} comments</StyledThreadButton>
      <StyledThreadButton>report post</StyledThreadButton>
    </StyledThreadButtons>
  );
};

export default ThreadButtons;