import styled from 'styled-components';

const StyledThreadButtons = styled.div`
  display: flex;
  border: 1px solid white;
  gap: 1rem;
`;

const StyledThreadButton = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
`;

const ThreadButtons = () => {
  return (
    <StyledThreadButtons>
      <StyledThreadButton>comment</StyledThreadButton>
      <StyledThreadButton>give award</StyledThreadButton>
      <StyledThreadButton>report</StyledThreadButton>
    </StyledThreadButtons>
  );
};

export default ThreadButtons;
