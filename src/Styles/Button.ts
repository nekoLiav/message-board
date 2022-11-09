import styled from 'styled-components';

export const Button = styled.button`
  color: white;
  background: ${(props) => props.theme.btnbg};
  border: none;
  font-size: 1.125rem;
  font-weight: bold;
  text-shadow: 1px 1px 5px #333333;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    filter: brightness(110%);
  }

  &:active {
    filter: brightness(90%);
  }
`;
