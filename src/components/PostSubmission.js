/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { db } from '../firebase/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';

const StyledPostSubmission = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  background: black;
  border-width: 0 1px 0 1px;
  border-style: solid;
  border-color: grey;
`;

const PostSubmissionForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const FieldWrapper = styled.div``;

const BodyField = styled.textarea`
  color: white;
  background: black;
  min-height: 100px;
  width: 100%;
  resize: none;
  border: none;
  font-size: 1.5rem;

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background: rgb(0, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(0, 255, 255, 1) 0%,
    rgba(255, 0, 255, 1) 100%
  );
  border: none;
  border-radius: 10px;
  width: 10rem;
  height: 3rem;
  font-size: 1.5rem;

  &:hover {
    cursor: pointer;
  }
`;

const PostSubmission = (props) => {
  const handleSubmission = async (e) => {
    e.preventDefault();
    const body = document.getElementById('body').value;
    const newPost = await addDoc(
      collection(db, 'users', props.user),
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
          <BodyField
            name="body"
            id="body"
            placeholder="sup? wanna post something?"
          ></BodyField>
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
