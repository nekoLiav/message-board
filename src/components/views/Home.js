import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Post from '../Post';
import { db } from '../../firebase/firebase-config';
import { collectionGroup, getDocs, query } from 'firebase/firestore';

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: #222222;
`;

const HomeList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const queryHomePosts = query(collectionGroup(db, 'posts'));
        const fetchedPosts = await getDocs(queryHomePosts);
        let HomePosts = [];
        fetchedPosts.forEach((post) =>
          HomePosts.push({
            ...post.data(),
            subnublet: post.ref.parent.parent.id,
          })
        );
        setPosts(HomePosts);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    };
    fetchHome();
  }, []);

  return (
    <StyledHome>
      <HomeList>
        {posts.map((post) => (
          <Post key={post.metadata['time-posted']} post={post} />
        ))}
      </HomeList>
    </StyledHome>
  );
};

export default Home;
