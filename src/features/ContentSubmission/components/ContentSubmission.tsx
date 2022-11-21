import { submitPost } from 'functions/submitPost';
import { useForm, SubmitHandler } from 'react-hook-form';
import { submitMessage } from 'functions/submitMessage';
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
  currentUser: UserType;
  recipient?: string;
  post?: PostType;
  message?: string;
};

export const ContentSubmission = ({
  currentUser,
  recipient,
  post,
  message,
}: ContentSubmissionProps) => {
  const { handle, avatar } = currentUser;

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (recipient) {
      submitMessage(data.body, { currentUser, recipient, message });
    }
    if (post) {
      submitPost(data.body, { currentUser, post });
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
