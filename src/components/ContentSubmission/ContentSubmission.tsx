import { submitPost } from '@/functions/submitPost';
import { UserPropType, PostPropType } from '@/types/PropTypes';
import { useForm, SubmitHandler } from 'react-hook-form';
import { submitMessage } from '@/functions/submitMessage';
import {
  ContentSubmissionContainer,
  ContentSubmissionButton,
  AvatarLink,
  Avatar,
  ContentSubmissionForm,
  BodyField,
} from './style';

type Inputs = {
  body: string;
};

type ContentSubmissionProps = {
  clientUser: UserType;
  recipient?: string;
  post?: PostType;
  message?: string;
};

const ContentSubmission = ({
  clientUser,
  recipient,
  post,
  message,
}: ContentSubmissionProps) => {
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
    <ContentSubmissionContainer>
      <AvatarLink to={`/${handle}`}>
        <Avatar src={avatar} />
      </AvatarLink>
      <ContentSubmissionForm onSubmit={handleSubmit(onSubmit)}>
        <BodyField id="body" placeholder="..." {...register('body')} />
        <ContentSubmissionButton type="submit">Submit</ContentSubmissionButton>
      </ContentSubmissionForm>
    </ContentSubmissionContainer>
  );
};

ContentSubmission.propTypes = {
  clientUser: UserPropType.isRequired,
  post: PostPropType,
};

export default ContentSubmission;
