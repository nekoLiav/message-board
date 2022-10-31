/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { db } from '../firebase/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

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
  const params = useParams();

  const postString =
    props.type === 'submission'
      ? 'sup? wanna post something?'
      : 'sup? wanna reply to this?';
  const buttonString =
    props.type === 'submission' ? 'submit post' : 'submit reply';

  const handleSubmission = async (e) => {
    e.preventDefault();
    const body = document.getElementById('body').value;
    if (props.type === 'submission') {
      const newPost = await addDoc(
        collection(db, 'users', props.user),
        { ...props.post, type: 'submission' },
        { merge: true }
      );
    }
    if (props.type === 'reply') {
      const newReply = await addDoc(
        collection(db, 'users', params.user, 'posts'),
        { ...props.post, type: 'reply', body: body, parent: params.post },
        { merge: true }
      );
    }
  };

  return (
    <StyledPostSubmission>
      <PostSubmissionForm onSubmit={handleSubmission}>
        <FieldWrapper>
          <BodyField name="body" id="body" placeholder={postString}></BodyField>
        </FieldWrapper>
        <SubmitButton type="submit">{buttonString}</SubmitButton>
      </PostSubmissionForm>
    </StyledPostSubmission>
  );
};

PostSubmission.propTypes = {
  post: PropTypes.shape({
    authorID: PropTypes.string,
    authorName: PropTypes.string,
    body: PropTypes.string,
    created: PropTypes.number,
    type: PropTypes.string,
  }),
  user: PropTypes.string,
  type: PropTypes.string,
};

export default PostSubmission;
