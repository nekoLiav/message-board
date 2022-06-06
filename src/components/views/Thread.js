import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';

const StyledThread = styled.div`
  background: #333333;
  width: 100%;
  height: 100%;
`;

const CommentContainer = styled.div`
  background: #222222;
  width: 100%;
  height: 5rem;
`;

const Comment = styled.p`
  color: white;
`;

const Thread = () => {
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const locationString = location.pathname.slice(12);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(
            db,
            'subnublets',
            location.state.sub,
            'posts',
            locationString,
            'comments'
          )
        );
        let commentMiddleman = [];
        querySnapshot.forEach((doc) => commentMiddleman.push(doc.data()));
        setComments(commentMiddleman);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    };
    fetchComments();
  }, []);

  return (
    <StyledThread>
      <CommentContainer>
        {comments.map((comment) => (
          <Comment key={comment.text}>{comment.text}</Comment>
        ))}
      </CommentContainer>
    </StyledThread>
  );
};

export default Thread;
