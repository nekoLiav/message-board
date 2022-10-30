/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db, userID } from '../firebase/firebase-config';
import { getDocs, collection } from 'firebase/firestore';
import Post from './Post';
import Header from './Header';
import PostSubmission from './PostSubmission';

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

  useEffect(() => {
    // const queryPosts = async () => {
    //   try {
    //     const querySnapshot = await getDocs(collection(db, 'posts'));
    //     let tempPosts = [];
    //     querySnapshot.forEach((doc) => {
    //       tempPosts.push(doc.data());
    //     });
    //     setPosts(tempPosts);
    //   } catch (error) {
    //     console.log('Something went wrong!', error);
    //   }
    // };
    // queryPosts();
  }, []);

  console.log(posts);

  return (
    <StyledHome>
      <HomePostList></HomePostList>
    </StyledHome>
  );
};

export default Home;
