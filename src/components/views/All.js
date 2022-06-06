import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Post from '../Post';
import { db } from '../../firebase/firebase-config';
import { collectionGroup, getDocs, query } from 'firebase/firestore';
import Sidebar from '../Sidebar';

const StyledAll = styled.div`
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

const AllList = styled.div`
  height: 100%;
  width: 100%;
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
          allPosts.push({
            ...post.data(),
            subnublet: post.ref.parent.parent.id,
          })
        );
        setPosts(allPosts);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    };
    fetchAll();
  }, []);

  return (
    <StyledAll>
      <View>
        <AllList>
          {posts.map((post) => (
            <Post key={post.metadata['time-posted']} post={post} />
          ))}
        </AllList>
        <Sidebar />
      </View>
    </StyledAll>
  );
};

export default All;
