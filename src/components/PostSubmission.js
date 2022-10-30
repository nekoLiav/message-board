/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { db } from '../firebase/firebase-config';
import { collection, addDoc } from 'firebase/firestore';

const StyledPostSubmission = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: #222222;
`;

const PostSubmissionForm = styled.form`
  display: flex;
  flex-direction: column;
  background: #333333;
  width: 50vw;
  height: 100%;
  gap: 1rem;
  padding: 1rem;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: #222222;
  width: 100%;
`;

const BodyFieldLabel = styled.label`
  color: white;
  font-size: 1.5rem;
`;

const BodyField = styled.textarea`
  width: 100%;
  height: 10rem;
  background: #333333;
  color: white;
`;

const SubmitButton = styled.button`
  width: 10rem;
`;

const PostSubmission = () => {
  const handleSubmission = async (e) => {
    e.preventDefault();
    const body = document.getElementById('body').value;
    const newPost = await addDoc(
      collection(db, 'posts'),
      {
        body: body,
        created: Date.now(),
      },
      { merge: true }
    );
  };

  return (
    <StyledPostSubmission>
      <PostSubmissionForm onSubmit={handleSubmission}>
        <FieldWrapper>
          <BodyFieldLabel htmlFor="body">body:</BodyFieldLabel>
          <BodyField name="body" id="body"></BodyField>
        </FieldWrapper>
        <SubmitButton type="submit">submit post</SubmitButton>
      </PostSubmissionForm>
    </StyledPostSubmission>
  );
};

export default PostSubmission;
