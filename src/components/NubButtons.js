import styled from 'styled-components';

const StyledNubButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid white;
  padding: 0.25rem;
`;

const UpNubButton = styled.div`
  color: white;

  &:hover {
    color: orange;
    cursor: pointer;
  }
`;

const DownNubButton = styled.div`
  color: white;

  &:hover {
    color: lightblue;
    cursor: pointer;
  }
`;

const NubButtons = () => {
  return (
    <StyledNubButtons>
      <UpNubButton>/\</UpNubButton>
      <DownNubButton>\/</DownNubButton>
    </StyledNubButtons>
  );
};

export default NubButtons;
