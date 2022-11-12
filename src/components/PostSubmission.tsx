import styled from 'styled-components';
import { submitPost } from '../functions/submitPost';
import { UserPropType, PostPropType } from '../types/PropTypes';
import { Div } from '../styles/Div';
import { Button } from '../styles/Button';
import { TextArea } from '../styles/TextArea';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

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
  width: 100%;
  height: 100%;
  gap: 0.5rem;
`;

const BodyField = styled(TextArea)`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  min-height: 5rem;
`;

const SubmitButton = styled(Button)`
  height: 2rem;
  width: 6rem;
  border-radius: 15px;
  align-self: end;

  @media (max-width: 360px) {
    height: 1.5rem;
    width: 4.5rem;
    border-radius: 15px;
    font-size: 0.825rem;
  }
`;

type Inputs = {
  body: string;
};

type PostSubmissionProps = {
  clientUser: UserType;
  post?: PostType;
};

const PostSubmission = ({ clientUser, post }: PostSubmissionProps) => {
  const { handle, avatar } = clientUser;

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    submitPost(data.body, { clientUser, post });

  return (
    <StyledPostSubmission>
      <AvatarLink to={`/${handle}`}>
        <Avatar src={avatar} />
      </AvatarLink>
      <PostSubmissionForm onSubmit={handleSubmit(onSubmit)}>
        <BodyField id="body" placeholder="..." {...register('body')} />
        <SubmitButton type="submit">Submit</SubmitButton>
      </PostSubmissionForm>
    </StyledPostSubmission>
  );
};

PostSubmission.propTypes = {
  clientUser: UserPropType.isRequired,
  post: PostPropType,
};

export default PostSubmission;
