/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { db } from '../firebase/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';

const StyledPostSubmission = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
`;

const PostSubmissionForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BodyField = styled.input`
  color: white;
  background: black;
  height: 5rem;
`;

const SubmitButton = styled.button`
  width: 10rem;
`;

const PostSubmission = (props) => {
  const handleSubmission = async (e) => {
    e.preventDefault();
    const body = document.getElementById('body').value;
    const newPost = await addDoc(
      collection(db, 'posts'),
      {
        body: body,
        created: Date.now(),
        by: props.user,
      },
      { merge: true }
    );
  };

  return (
    <StyledPostSubmission>
      <PostSubmissionForm onSubmit={handleSubmission}>
        <FieldWrapper>
          <BodyField name="body" id="body"></BodyField>
        </FieldWrapper>
        <SubmitButton type="submit">submit post</SubmitButton>
      </PostSubmissionForm>
    </StyledPostSubmission>
  );
};

PostSubmission.propTypes = {
  user: PropTypes.string,
};

export default PostSubmission;
