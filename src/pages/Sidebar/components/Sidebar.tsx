import { useEffect, useState } from 'react';
import {
  LoginFlowContainer,
  SidebarContainer,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from './style';
import { SignUpModal } from 'features/SignUpModal/components/SignUpModal';
import { auth } from 'config';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { SignInModal } from 'features/SignInModal';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  const navigate = useNavigate();

  function handleSignUpClick() {
    setSignUpModalOpen(!signUpModalOpen);
  }

  function handleSignInClick() {
    setSignInModalOpen(!signInModalOpen);
  }

  async function handleSignOutClick() {
    signOut(auth);
    navigate('/home');
  }

  return (
    <SidebarContainer>
      <LoginFlowContainer>
        {!loggedIn && (
          <SignInButton onClick={handleSignInClick}>Sign In</SignInButton>
        )}
        {!loggedIn && (
          <SignUpButton onClick={handleSignUpClick}>Sign Up</SignUpButton>
        )}
        {loggedIn && (
          <SignOutButton onClick={handleSignOutClick}>Sign Out</SignOutButton>
        )}
      </LoginFlowContainer>
      {signUpModalOpen && <SignUpModal />}
      {signInModalOpen && <SignInModal />}
    </SidebarContainer>
  );
};
