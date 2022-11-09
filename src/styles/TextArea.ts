import styled from 'styled-components';

export const TextArea = styled.textarea`
  color: ${(props) => props.theme.fg};
  background: ${(props) => props.theme.bg};
  font-size: 1rem;
  resize: none;
  border: none;

  &:focus {
    outline: none;
  }
`;
