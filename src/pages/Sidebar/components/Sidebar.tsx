import { useState } from 'react';
import {
  LoginFlowContainer,
  SidebarContainer,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from './style';
import { SignUpModal } from 'features/SignUpModal/components/SignUpModal';
import { auth } from 'config';
import { signOut } from 'firebase/auth';

export const Sidebar = () => {
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);

  const user = auth.currentUser;

  function handleSignUpClick() {
    setSignUpModalOpen(!signUpModalOpen);
  }

  function handleSignInClick() {
    setSignInModalOpen(!signInModalOpen);
  }

  function handleSignOutClick() {
    signOut(auth);
  }

  return (
    <SidebarContainer>
      <LoginFlowContainer>
        {!user && <SignInButton>Sign In</SignInButton>}
        {!user && (
          <SignUpButton onClick={handleSignUpClick}>Sign Up</SignUpButton>
        )}
        {user && (
          <SignOutButton onClick={handleSignOutClick}>Sign Out</SignOutButton>
        )}
      </LoginFlowContainer>
      {signUpModalOpen && <SignUpModal />}
    </SidebarContainer>
  );
};
