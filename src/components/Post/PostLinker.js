import styled from 'styled-components';

const StyledPostLinker = styled.div`
  height: 100%;
  margin-top: 5px;
`;
const Linker = styled.div`
  width: 2px;
  background: grey;
  height: 100%;
`;

const PostLinker = () => {
  return (
    <StyledPostLinker>
      <Linker />
    </StyledPostLinker>
  );
};

export default PostLinker;
