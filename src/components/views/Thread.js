import styled from 'styled-components';

const StyledThread = styled.div`
  background: #333333;
  width: 100%;
  height: 100%;
`;

const CommentContainer = styled.div`
  background: #222222;
  width: 100%;
  height: 5rem;
`;

const Thread = () => {
  return (
    <StyledThread>
      <CommentContainer></CommentContainer>
    </StyledThread>
  );
};

export default Thread;
