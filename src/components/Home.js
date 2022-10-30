/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db, userID } from '../firebase/firebase-config';
import { collectionGroup, query, onSnapshot } from 'firebase/firestore';
import Post from './Post';
import Header from './Header';

const StyledHome = styled.div`
  display: flex;
  height: 100%;
  background: black;
  border: 1px solid grey;
`;

const HomePostList = styled.div`
  flex-grow: 2;
  border: 1px solid grey;
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const q = query(collectionGroup(db, 'posts'));
    const unsub = onSnapshot(q, (querySnapShot) => {
      const newPosts = [];
      querySnapShot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          newPosts.push({ ...change.doc.data(), id: change.doc.id });
        }
      });
      setPosts(newPosts);
      setIsUpdated(true);
    });
    return () => unsub();
  }, []);

  return (
    <StyledHome>
      <Header />
      <HomePostList>
        {isUpdated
          ? posts.map((post) => <Post key={post.id} post={post} />)
          : null}
      </HomePostList>
    </StyledHome>
  );
};

export default Home;
