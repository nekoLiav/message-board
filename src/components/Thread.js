/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { query, where, collectionGroup, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { Link } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';
import Header from './Header';
import PostSubmission from './PostSubmission';

const StyledThread = styled.div`
  color: white;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr minmax(min-content, 600px) 1fr;
  height: 100%;
  background: black;
  border: 1px solid grey;
`;

const ThreadMain = styled.div`
  border: 1px solid grey;
`;

const SourcePost = styled.div``;

const SourcePostInfo = styled.div``;

const SourcePostBody = styled.p``;

const ThreadAside = styled.div`
  border: 1px solid grey;
`;

const Thread = () => {
  const [post, setPost] = useState(null);
  const [replies, setreplies] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const params = useParams();

  useEffect(() => {
    const queryThread = async () => {
      try {
        const querySnapshot = await getDoc(
          doc(db, 'users', params.user, 'posts', params.post)
        );
        setPost(querySnapshot.data());
        setIsLoaded(true);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    };
    queryThread();
  }, []);

  const handleSubmit = () => {};

  return (
    <StyledThread>
      <Header />
      <ThreadMain>
        {isLoaded ? (
          <SourcePost>
            <SourcePostInfo>
              {`${post.authorName} - ${formatDistanceToNowStrict(
                post.created
              )}`}
            </SourcePostInfo>
            <SourcePostBody>{post.body}</SourcePostBody>
            <PostSubmission />
          </SourcePost>
        ) : null}
      </ThreadMain>
      <ThreadAside />
    </StyledThread>
  );
};

export default Thread;
