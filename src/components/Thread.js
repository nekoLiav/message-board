/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { collection, doc, getDoc, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { Link } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';

const StyledThread = styled.div`
  display: flex;
  flex-direction: column;
  background: #222222;
  width: 100%;
  height: 100%;
`;

const SourcePost = styled.div`
  background: #333333;
`;

const SourcePostInfo = styled.div`
  margin-left: 1rem;
  padding: 0.2rem;
`;

const SourcePostTitle = styled.p`
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;

const SourcePostSubmissionTime = styled.p`
  color: white;
  font-size: 0.8rem;
`;

const SourcePostAuthor = styled.p`
  color: white;
  font-size: 0.8rem;
`;

const SourcePostBody = styled.p`
  color: white;
  background: #222222;
  width: 50rem;
  padding: 0.2rem;
  margin-left: 1rem;
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

const CommentAuthor = styled(Link)`
  color: cyan;
  text-decoration: none;
  font-size: 0.8rem;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

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
  const [postData, setPostData] = useState({});
  const [replies, setreplies] = useState([]);
  const params = useParams();
  console.log(params);

  useEffect(() => {}, []);

  const handleSubmit = () => {};

  return (
    <StyledThread>
      <SourcePost>
        <SourcePostInfo>
          <SourcePostTitle></SourcePostTitle>
          <SourcePostSubmissionTime></SourcePostSubmissionTime>
          <SourcePostAuthor></SourcePostAuthor>
        </SourcePostInfo>
        <SourcePostBody></SourcePostBody>
      </SourcePost>
      <CommentSubmitForm onSubmit={handleSubmit}>
        <CommentSubmitText id="commenttext" />
        <CommentSubmitButton>submit comment</CommentSubmitButton>
      </CommentSubmitForm>
      {/* {replies.map((comment) => (
        <CommentContainer key={comment.metadata.metadata}>
          <Comment>
            <CommentAuthor to="/">{comment.metadata.author}</CommentAuthor>
            <CommentText>{comment.content}</CommentText>
            <CommentButtons>
              <CommentButton>reply</CommentButton>
            </CommentButtons>
          </Comment>
        </CommentContainer>
      ))} */}
    </StyledThread>
  );
};

export default Thread;
