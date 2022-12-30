import styled from 'styled-components';
import { Container } from 'components/Container';
import { Button } from 'components/Button';

export const SidebarContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
`;

export const LoginFlowContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 650px) {
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 650px) {
    flex-direction: row;
    align-items: center;
    width: 100%;
  }
`;

export const SignUpButton = styled(Button)``;

export const SignInButton = styled(Button)``;

export const SignOutButton = styled(Button)``;
