import styled from 'styled-components';

export const Button = styled.button`
  color: black;
  background: ${(props) => props.theme.btnbg};
  border: none;
  font-size: 1.125rem;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    filter: brightness(90%);
  }

  &:active {
    filter: brightness(80%);
  }
`;
