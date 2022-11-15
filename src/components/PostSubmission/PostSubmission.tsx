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
  recipient?: string;
  post?: PostType;
  message?: string;
};

const PostSubmission = ({
  clientUser,
  recipient,
  post,
  message,
}: PostSubmissionProps) => {
  const { handle, avatar } = clientUser;

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (recipient) {
      submitMessage(data.body, { clientUser, recipient, message });
    }
    if (post) {
      submitPost(data.body, { clientUser, post });
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
