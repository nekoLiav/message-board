/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase/firebase-config';
import styled from 'styled-components';
import Home from './components/Home/Home';
import PostView from './components/PostView';
import { doc, getDoc } from 'firebase/firestore';

const StyledApp = styled.div`
  height: 100%;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    signInWithEmailAndPassword(auth, 'peepee@poopoo.com', '123456')
      .then(async (userCredential) => {
        const docRef = doc(db, 'users', userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        setUser(docSnap.data());
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log('Something went wrong!', error);
      });
  }, []);

  return (
    <StyledApp>
      <Routes>
        <Route
          path="/"
          element={<Home isLoggedIn={isLoggedIn} user={user} />}
        />
        <Route
          path="/:user/post/:post"
          element={<PostView user={user} key={location.key} />}
        />
      </Routes>
    </StyledApp>
  );
}

export default App;
