import styled from 'styled-components';

export const Button = styled.button`
  color: black;
  background: ${(props) => props.theme.y};
  border: none;
  font-size: 1.125rem;
  font-weight: bold;
  transition: 0.2s;
  height: 2rem;
  width: 6rem;
  border-radius: 15px;

  &:hover {
    cursor: pointer;
    filter: brightness(90%);
  }

  &:active {
    filter: brightness(80%);
  }

  @media (max-width: 360px) {
    font-size: 0.825rem;
  }
`;
