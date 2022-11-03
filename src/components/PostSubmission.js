/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { db } from '../firebase/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const StyledPostSubmission = styled.div`
  display: flex;
  background: black;
`;

const UserAvatar = styled.img`
  max-height: 50px;
  max-width: 50px;
  border-radius: 100%;
  margin: 1rem;
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
  font-size: 1.2rem;

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
  height: 30px;
  width: 100px;
  border-radius: 15px;

  font-size: 1.2rem;

  &:hover {
    cursor: pointer;
  }
`;

const PostSubmission = (props) => {
  const params = useParams();
  console.log(params);

  const handleSubmission = async (e) => {
    e.preventDefault();
  };

  return (
    <StyledPostSubmission>
      <UserAvatar src={props.user.avatar} />
      <PostSubmissionForm onSubmit={handleSubmission}>
        <FieldWrapper>
          <BodyField name="body" id="body" placeholder="..."></BodyField>
        </FieldWrapper>
        <SubmitButton type="submit">submit</SubmitButton>
      </PostSubmissionForm>
    </StyledPostSubmission>
  );
};

PostSubmission.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
  }),
};

export default PostSubmission;
