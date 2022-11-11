import styled from 'styled-components';

const StyledAside = styled.div`
  @media (max-width: 350px) {
    display: none;
  }
`;

const Aside = () => {
  return <StyledAside />;
};

export default Aside;
