/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import styled from 'styled-components';
import Post from '../Post';
import Sidebar from '../Sidebar';

const StyledSubnublet = styled.div`
  display: flex;
  flex-direction: column;
  background: #222222;
  height: 100%;
  width: 100%;
`;

const View = styled.div`
  display: flex;
  height: 100%;
`;

const SubnubletList = styled.div`
  height: 100%;
  width: 100%;
`;

const SubNub = () => {
  const { subnublet } = useParams();

  const [subnubletPosts, setSubnubletPosts] = useState([]);

  useEffect(() => {
    const fetchSubnubletPosts = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, 'subnublets', subnublet, 'posts')
        );
        let subnubletPostsMiddleman = [];
        querySnapshot.forEach((doc) => {
          subnubletPostsMiddleman.push({ ...doc.data(), subnublet: subnublet });
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
      <View>
        <SubnubletList>
          {subnubletPosts.map((post) => (
            <Post key={post.metadata['time-posted']} post={post} />
          ))}
        </SubnubletList>
        <Sidebar />
      </View>
    </StyledSubnublet>
  );
};

export default SubNub;
