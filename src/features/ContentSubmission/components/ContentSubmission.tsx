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
  ImgField,
  Attachments,
  ImageAttachment,
} from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useState } from 'react';

type Inputs = {
  body: string;
  img?: string;
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
  const [attachImg, setAttachImg] = useState(false);

  const { handle, avatar } = currentUser;

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (recipient) {
      submitMessage(data, { currentUser, recipient, message });
    }
    if (post) {
      submitPost(data, { currentUser, post });
    } else {
      submitPost(data, { currentUser });
    }
  };

  return (
    <ContentSubmissionContainer>
      <AvatarLink to={`/${handle}`}>
        <Avatar src={avatar} />
      </AvatarLink>
      <ContentSubmissionForm onSubmit={handleSubmit(onSubmit)}>
        <BodyField id="body" placeholder="..." {...register('body')} />
        {attachImg && (
          <ImgField
            id="img"
            placeholder="put img url here"
            {...register('img')}
          />
        )}
        <Attachments>
          <ImageAttachment onClick={() => setAttachImg(!attachImg)}>
            <FontAwesomeIcon icon={solid('image')} />
          </ImageAttachment>
        </Attachments>
        <ContentSubmissionButton type="submit">Submit</ContentSubmissionButton>
      </ContentSubmissionForm>
    </ContentSubmissionContainer>
  );
};
