/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase/firebase-config';
import styled from 'styled-components';
import Home from './components/Home';
import Thread from './components/Thread';
import { doc, getDoc } from 'firebase/firestore';

const StyledApp = styled.div`
  height: 100%;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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
          exact
          path="/"
          element={<Home isLoggedIn={isLoggedIn} user={user} />}
        ></Route>
        <Route path="/user/:user/post/:post" element={<Thread />}></Route>
      </Routes>
    </StyledApp>
  );
}

export default App;
