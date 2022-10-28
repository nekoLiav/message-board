import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';

const StyledThread = styled.div`
  display: flex;
  flex-direction: column;
  background: #222222;
  width: 100%;
  height: 100%;
`;

const CommentSubmitForm = styled.form`
  display: flex;
  flex-direction: column;
  background: #333333;
  gap: 1rem;
  padding: 1rem;
`;

const CommentSubmitText = styled.textarea`
  width: 42rem;
  height: 10rem;
  background: #222222;
  color: white;
`;

const CommentSubmitButton = styled.button`
  width: 10rem;
`;

const CommentContainer = styled.div`
  display: flex;
  color: white;
  width: 100%;
  padding: 0.3rem 0;

  &:hover {
    background: #333333;
  }
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
`;

const CommentAuthor = styled.p``;

const CommentText = styled.p`
  width: 40rem;
  line-height: 1.5rem;
`;

const CommentButtons = styled.div`
  display: flex;
`;

const CommentButton = styled.p`
  font-size: 0.7rem;
  font-weight: bold;
  text-decoration: none;
  color: white;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Thread = () => {
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const locationString = location.pathname.slice(12);
  const sub = location.state.sub;

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
        console.log(commentMiddleman);
        setComments(commentMiddleman);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    };
    fetchComments();
  }, []);

  const handleSubmit = () => {
    const commentText = document.getElementById('commenttext').value;
    addDoc(
      collection(db, 'subnublets', sub, 'posts', locationString, 'comments'),
      {
        text: commentText,
      },
      { merge: true }
    );
  };

  return (
    <StyledThread>
      <CommentSubmitForm onSubmit={handleSubmit}>
        <CommentSubmitText id="commenttext" />
        <CommentSubmitButton>submit comment</CommentSubmitButton>
      </CommentSubmitForm>
      {comments.map((comment) => (
        <CommentContainer key={comment.metadata.metadata}>
          <Comment>
            <CommentAuthor>{comment.metadata.author}</CommentAuthor>
            <CommentText>{comment.content}</CommentText>
            <CommentButtons>
              <CommentButton>reply</CommentButton>
            </CommentButtons>
          </Comment>
        </CommentContainer>
      ))}
    </StyledThread>
  );
};

export default Thread;
