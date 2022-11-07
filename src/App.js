import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase/firebase-config';
import styled from 'styled-components';
import Home from './components/Home';
import PostView from './components/PostView';
import { getUser } from './DB/getUser';

const StyledApp = styled.div`
  height: 100%;
`;

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    signInWithEmailAndPassword(auth, 'peepee@poopoo.com', '123456')
      .then(async (userCredential) => {
        const id = await userCredential.user.uid;
        const userData = await getUser(id);
        setUser(userData);
      })
      .catch((error) => {
        console.log('Something went wrong!', error);
      });
  }, []);

  return (
    <StyledApp>
      <Routes>
        <Route path="/" element={user !== null ? <Home user={user} /> : null} />
        <Route
          path="/:user/post/:post"
          element={
            user !== null ? <PostView user={user} key={location.key} /> : null
          }
        />
      </Routes>
    </StyledApp>
  );
}

export default App;
