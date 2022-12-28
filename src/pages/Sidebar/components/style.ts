import styled from 'styled-components';
import { Container } from 'components/Container';
import { Button } from 'components/Button';

export const SidebarContainer = styled(Container)`
  @media (max-width: 350px) {
    display: none;
  }
`;

export const LoginContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 10rem;
  height: 5rem;
  border: 1px solid;
  border-color: ${(props) => props.theme.secondary};
`;

export const SignUpButton = styled(Button)``;

export const SignInButton = styled(Button)``;
