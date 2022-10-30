/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase/firebase-config';
import { collectionGroup, query, onSnapshot } from 'firebase/firestore';
import Sidebar from '../Sidebar';
import Post from '../Post';

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: black;
`;

const View = styled.div`
  display: flex;
  height: 100%;
`;

const HomeList = styled.div`
  height: 100%;
  width: 100%;
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
    // return () => unsub();
  }, []);

  return (
    <StyledHome>
      <View>
        <HomeList>
          {isUpdated
            ? posts.map((post) => <Post key={post.id} post={post} />)
            : null}
        </HomeList>
        <Sidebar />
      </View>
    </StyledHome>
  );
};

export default Home;
