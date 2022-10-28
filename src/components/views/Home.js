import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase/firebase-config';
import { collectionGroup, getDocs, query } from 'firebase/firestore';
import Sidebar from '../Sidebar';
import Post from '../Post';

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: #222222;
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

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const queryHomePosts = query(collectionGroup(db, 'posts'));
        const fetchedPosts = await getDocs(queryHomePosts);
        fetchedPosts.forEach((post) =>
          setPosts((posts) => [...posts, { ...post.data(), id: post.id }])
        );
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    };
    setTimeout(() => {
      fetchHome();
    }, 1000);
  }, []);

  return (
    <StyledHome>
      <View>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        <HomeList></HomeList>
        <Sidebar />
      </View>
    </StyledHome>
  );
};

export default Home;
