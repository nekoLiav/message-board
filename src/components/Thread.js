import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import Header from './Header';
import PostSubmission from './PostSubmission';
import Post from './Post';

const StyledThread = styled.div`
  color: white;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr minmax(min-content, 600px) 1fr;
  height: 100%;
  width: 100%;
  background: black;
`;

const ThreadMain = styled.div`
  background: black;
`;

const Replies = styled.div`
  border-top-width: 1px;
  border-top-color: grey;
  border-top-style: solid;
`;

const ThreadAside = styled.div`
  background: black;
`;

const Thread = () => {
  const [post, setPost] = useState(null);
  const [postLoaded, setPostLoaded] = useState(false);
  const [replies, setreplies] = useState(null);
  const [repliesLoaded, setRepliesLoaded] = useState(false);
  const params = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        const docRef = doc(db, 'posts', params.post);
        const docSnap = await getDoc(docRef);
        setPost({ ...docSnap.data(), id: docSnap.id });
        setPostLoaded(true);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    };
    getPost();
    const getReplies = async () => {
      try {
        const q = query(
          collection(db, 'posts'),
          where('parent', '==', params.user)
        );
        let tempReplies = [];
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) =>
          tempReplies.push({ ...doc.data(), id: doc.id })
        );
        setreplies(tempReplies);
        setRepliesLoaded(true);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    };
    getReplies();
  }, [params]);

  return (
    <StyledThread>
      <Header />
      {postLoaded ? (
        <ThreadMain>
          <Post post={post} />
          <PostSubmission type={'reply'} post={post} />
          <Replies>
            {repliesLoaded
              ? replies.map((reply) => <Post key={reply.id} post={reply} />)
              : null}
          </Replies>
        </ThreadMain>
      ) : null}
      <ThreadAside />
    </StyledThread>
  );
};

export default Thread;
