import styled from 'styled-components';
import { submitPost } from '../functions/submitPost';
import { UserPropType, PostPropType } from '../types/PropTypes';
import { Div } from '../styles/Div';
import { PostSubmissionButton } from '../components/Buttons';
import { TextArea } from '../styles/TextArea';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { submitMessage } from '../functions/submitMessage';

const StyledPostSubmission = styled(Div)`
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
`;

const AvatarLink = styled(Link)`
  max-width: 3rem;
  max-height: 3rem;
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

type Inputs = {
  body: string;
};

type PostSubmissionProps = {
  clientUser: UserType;
  recipient?: UserType;
  post?: PostType;
  message?: MessageType;
  type?: 'message' | 'post';
};

const PostSubmission = ({
  clientUser,
  recipient,
  post,
  message,
  type,
}: PostSubmissionProps) => {
  const { handle, avatar } = clientUser;

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (type === 'post') {
      submitPost(data.body, { clientUser, post });
    }
    if (type === 'message') {
      submitMessage(data.body, { clientUser, recipient, message });
    }
  };

  return (
    <StyledPostSubmission>
      <AvatarLink to={`/${handle}`}>
        <Avatar src={avatar} />
      </AvatarLink>
      <PostSubmissionForm onSubmit={handleSubmit(onSubmit)}>
        <BodyField id="body" placeholder="..." {...register('body')} />
        <PostSubmissionButton type="submit">Submit</PostSubmissionButton>
      </PostSubmissionForm>
    </StyledPostSubmission>
  );
};

PostSubmission.propTypes = {
  clientUser: UserPropType.isRequired,
  post: PostPropType,
};

export default PostSubmission;
