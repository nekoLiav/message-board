import styled from 'styled-components';
import PropTypes from 'prop-types';
import PostAvatar from './Post/PostAvatar';
import { submitPost } from '../DB/submitPost.js';

const StyledPostSubmission = styled.div`
  display: flex;
  background: black;
  border-bottom: 1px solid grey;
  padding: 0.5rem;
  gap: 0.5rem;
`;

const PostSubmissionForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const FieldWrapper = styled.div``;

const BodyField = styled.textarea`
  color: white;
  background: black;
  min-height: 100px;
  resize: none;
  border: none;
  font-size: 1rem;
  width: 100%;
  height: 100%;
  padding: 0;

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
  return (
    <StyledPostSubmission>
      <PostAvatar avatar={props.avatar} />
      <PostSubmissionForm onSubmit={(e) => submitPost(e, props)}>
        <FieldWrapper>
          <BodyField name="body" id="body" placeholder="..."></BodyField>
        </FieldWrapper>
        <SubmitButton type="submit">submit</SubmitButton>
      </PostSubmissionForm>
    </StyledPostSubmission>
  );
};

PostSubmission.propTypes = {
  avatar: PropTypes.string,
};

export default PostSubmission;
