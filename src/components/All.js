import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Post from './Post';
import { db } from '../firebase/firebase-config';
import { collectionGroup, getDocs, query } from 'firebase/firestore';

const StyledAll = styled.div`
  display: flex;
  flex-direction: column;
  background: #222222;
  border: 1px solid white;
  width: 100%;
  padding: 1rem 1rem 1rem 1rem;
`;

const AllHeader = styled.h1`
  border: 1px solid white;
  color: white;
  padding: 0.5rem;
`;

const AllList = styled.div`
  border: 1px solid white;
  height: 100%;
`;

const All = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const queryAllPosts = query(collectionGroup(db, 'posts'));
        const fetchedPosts = await getDocs(queryAllPosts);
        let allPosts = [];
        fetchedPosts.forEach((post) =>
          allPosts.push(
            Object.assign(post.data(), { subnublet: post.ref.parent.parent.id })
          )
        );
        setPosts(allPosts);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    };
    fetchAll();
    // query by subnublet
    // const fetchPosts = async () => {
    //   try {
    //     const fetchedPosts = await getDocs(
    //       collection(db, 'subnublets', 'ps5', 'posts')
    //     );
    //     let fetchedPostsMiddleman = [];
    //     fetchedPosts.forEach((post) => fetchedPostsMiddleman.push(post.data()));
    //     setPosts(fetchedPostsMiddleman);
    //   } catch (error) {
    //     console.log('Something went wrong!', error);
    //   }
    // };
    // fetchPosts();
  }, []);

  return (
    <StyledAll>
      <AllHeader>all</AllHeader>
      <AllList>
        {posts.map((post) => (
          <Post key={post.metadata['time-posted']} post={post} />
        ))}
      </AllList>
    </StyledAll>
  );
};

export default All;
