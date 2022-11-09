import styled from 'styled-components';
import { InferProps } from 'prop-types';
import { submitPost } from '../functions/submitPost';
import { UserType, PostType } from '../types/PropTypes';
import { Div } from '../styles/Div';
import { Button } from '../styles/Button';
import { TextArea } from '../styles/TextArea';

const StyledPostSubmission = styled(Div)`
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
`;

const PostSubmissionForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const BodyField = styled(TextArea)`
  min-height: 100px;
  width: 100%;
  height: 100%;
`;

const SubmitButton = styled(Button)`
  height: 2rem;
  width: 6rem;
  border-radius: 15px;
  align-self: end;
`;

const PostSubmissionPropTypes = {
  user: UserType.isRequired,
  post: PostType,
};

type PostSubmissionProps = InferProps<typeof PostSubmissionPropTypes>;

const PostSubmission = ({ user, post }: PostSubmissionProps) => {
  return (
    <StyledPostSubmission>
      <PostSubmissionForm onSubmit={(e) => submitPost(e, { user, post })}>
        <Div>
          <BodyField name="body" id="body" placeholder="..."></BodyField>
        </Div>
        <SubmitButton type="submit">Submit</SubmitButton>
      </PostSubmissionForm>
    </StyledPostSubmission>
  );
};

PostSubmission.propTypes = PostSubmissionPropTypes;

export default PostSubmission;
