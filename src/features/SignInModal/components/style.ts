import { Button } from 'components/Button';
import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
`;

export const SignInBlurb = styled.p`
  color: white;
  align-self: center;
`;

export const StyledInput = styled.input`
  color: ${(props) => props.theme.primary};
  background: ${(props) => props.theme.bg_darkest};
  border: 1px solid;
  border-color: ${(props) => props.theme.secondary};
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const StyledSubmitButton = styled(Button)`
  align-self: flex-end;
`;

export const ModalErrorText = styled.p`
  color: red;
`;
