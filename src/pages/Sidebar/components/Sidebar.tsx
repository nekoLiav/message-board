import {
  LoginContainer,
  SidebarContainer,
  SignInButton,
  SignUpButton,
} from './style';

export const Sidebar = () => {
  return (
    <SidebarContainer>
      <LoginContainer>
        <SignInButton>Sign In</SignInButton>
        <SignUpButton>Sign Up</SignUpButton>
      </LoginContainer>
    </SidebarContainer>
  );
};
