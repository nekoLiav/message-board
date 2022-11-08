import styled from 'styled-components';
import { InferProps } from 'prop-types';
import PostAvatar from '../Post/PostAvatar';
import { submitPost } from './submitPost';
import { UserType, PostType } from '../../Types/PropTypes';

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
  color: white;
  background: linear-gradient(
    90deg,
    rgba(0, 255, 255, 1) 0%,
    rgba(255, 0, 255, 1) 100%
  );
  transition: 0.2s;
  border: none;
  height: 30px;
  width: 100px;
  border-radius: 15px;

  font-size: 1.25rem;
  font-weight: bold;
  text-shadow: 1px 1px 5px #333333;

  &:hover {
    cursor: pointer;
    filter: brightness(110%);
  }

  &:active {
    filter: brightness(90%);
  }
`;

const PostSubmissionPropTypes = {
  user: UserType.isRequired,
  post: PostType.isRequired,
};

type PostSubmissionProps = InferProps<typeof PostSubmissionPropTypes>;

const PostSubmission = ({ user, post }: PostSubmissionProps) => {
  return (
    <StyledPostSubmission>
      <PostAvatar user={user} />
      <PostSubmissionForm onSubmit={(e) => submitPost(e, user, post)}>
        <FieldWrapper>
          <BodyField name="body" id="body" placeholder="..."></BodyField>
        </FieldWrapper>
        <SubmitButton type="submit">Submit</SubmitButton>
      </PostSubmissionForm>
    </StyledPostSubmission>
  );
};

PostSubmission.propTypes = PostSubmissionPropTypes;

export default PostSubmission;
