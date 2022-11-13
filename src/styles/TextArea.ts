import styled from 'styled-components';

export const TextArea = styled.textarea`
  color: ${(props) => props.theme.primary};
  background: ${(props) => props.theme.bg_darkest};
  font-size: 1rem;
  resize: none;
  border: none;

  &:focus {
    outline: none;
  }
`;
