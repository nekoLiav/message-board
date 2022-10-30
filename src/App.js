/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { db, auth } from './firebase/firebase-config';
import styled from 'styled-components';
import Home from './components/Home';
import Thread from './components/Thread';

const StyledApp = styled.div`
  height: 100%;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is logged in!');
        setUser(user.uid);
        setIsLoggedIn(true);
      } else {
        console.log('User is logged out.');
      }
    });
  }, []);

  return (
    <StyledApp>
      <Routes>
        <Route
          exact
          path="/"
          element={<Home isLoggedIn={isLoggedIn} user={user} />}
        ></Route>
        <Route
          path="/user/:user/submissions/:submission"
          element={<Thread />}
        ></Route>
      </Routes>
    </StyledApp>
  );
}

export default App;
