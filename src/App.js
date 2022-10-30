/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase-config';
import styled from 'styled-components';
import Home from './components/Home';

const StyledApp = styled.div`
  height: 100%;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    signInAnonymously(auth)
      .then(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser({ id: user.uid });
            setIsLoggedIn(true);
          }
        });
      })
      .catch((error) => {
        console.log(error.code, error.message);
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
      </Routes>
    </StyledApp>
  );
}

export default App;
