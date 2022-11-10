import styled from 'styled-components';
import { submitPost } from '../functions/submitPost';
import { UserPropType, PostPropType } from '../types/PropTypes';
import { Div } from '../styles/Div';
import { Button } from '../styles/Button';
import { TextArea } from '../styles/TextArea';
import { Link } from 'react-router-dom';

const StyledPostSubmission = styled(Div)`
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
`;

const AvatarLink = styled(Link)`
  max-width: 3rem;
  max-height: 3rem;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 3;
`;

const Avatar = styled.img`
  display: block;
  max-width: 3rem;
  max-height: 3rem;
  border-radius: 100%;
`;

const PostSubmissionForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.5rem;
`;

const BodyField = styled(TextArea)`
  min-height: 100px;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
`;

const SubmitButton = styled(Button)`
  height: 2rem;
  width: 6rem;
  border-radius: 15px;
  align-self: end;
`;

type PostSubmissionProps = {
  clientUser: UserType;
  post?: PostType;
};

const PostSubmission = ({ clientUser, post }: PostSubmissionProps) => {
  return (
    <StyledPostSubmission>
      <AvatarLink to={`/${clientUser.handle}`}>
        <Avatar src={clientUser.avatar} />
      </AvatarLink>
      <PostSubmissionForm onSubmit={(e) => submitPost(e, clientUser, post)}>
        <Div>
          <BodyField name="body" id="body" placeholder="..."></BodyField>
        </Div>
        <SubmitButton type="submit">Submit</SubmitButton>
      </PostSubmissionForm>
    </StyledPostSubmission>
  );
};

PostSubmission.propTypes = {
  clientUser: UserPropType,
  user: UserPropType,
  post: PostPropType,
};

export default PostSubmission;
