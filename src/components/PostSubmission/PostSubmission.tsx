import { submitPost } from '../../functions/submitPost';
import { UserPropType, PostPropType } from '../../types/PropTypes';
import { useForm, SubmitHandler } from 'react-hook-form';
import { submitMessage } from '../../functions/submitMessage';
import {
  PostSubmissionContainer,
  PostSubmissionButton,
  AvatarLink,
  Avatar,
  PostSubmissionForm,
  BodyField,
} from './style';

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
    <PostSubmissionContainer>
      <AvatarLink to={`/${handle}`}>
        <Avatar src={avatar} />
      </AvatarLink>
      <PostSubmissionForm onSubmit={handleSubmit(onSubmit)}>
        <BodyField id="body" placeholder="..." {...register('body')} />
        <PostSubmissionButton type="submit">Submit</PostSubmissionButton>
      </PostSubmissionForm>
    </PostSubmissionContainer>
  );
};

PostSubmission.propTypes = {
  clientUser: UserPropType.isRequired,
  post: PostPropType,
};

export default PostSubmission;
