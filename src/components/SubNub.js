/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import styled from 'styled-components';
import Post from './Post';

const StyledSubnublet = styled.div`
  display: flex;
  flex-direction: column;
  background: #222222;
  border: 1px solid white;
  height: 100%;
  width: 100%;
  padding: 1rem 1rem 1rem 1rem;
`;

const SubnubletHeader = styled.h1`
  border: 1px solid white;
  color: white;
  padding: 0.5rem;
`;

const SubnubletList = styled.div`
  border: 1px solid white;
  height: 100%;
`;

const SubNub = () => {
  const { subnub } = useParams();

  const [subnubletPosts, setSubnubletPosts] = useState([]);

  useEffect(() => {
    const fetchSubnubletPosts = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, 'subnublets', subnub, 'posts')
        );
        let subnubletPostsMiddleman = [];
        querySnapshot.forEach((doc) => {
          subnubletPostsMiddleman.push(
            Object.assign(doc.data(), { subnublet: subnub })
          );
        });
        setSubnubletPosts(subnubletPostsMiddleman);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    };
    fetchSubnubletPosts();
  }, []);

  return (
    <StyledSubnublet>
      <SubnubletHeader>{subnub}</SubnubletHeader>
      <SubnubletList>
        {subnubletPosts.map((post) => (
          <Post key={post.metadata['time-posted']} post={post} />
        ))}
      </SubnubletList>
    </StyledSubnublet>
  );
};

export default SubNub;
