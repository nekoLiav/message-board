import { useNavigate } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';
import { SyntheticEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Avatar } from 'components/Avatar';
import {
  ContentContainer,
  AvatarLink,
  Linker,
  Info,
  Name,
  Handle,
  DatePosted,
  Body,
  Text,
  Img,
  Engagement,
  EngagementSubcontainer,
  EngagementText,
} from './style';
import { doc, runTransaction } from 'firebase/firestore';
import { db } from 'config';
import { postConverter } from 'functions/firestoreDataCoversion';

type ContentProps = {
  content: PostType | MessageType;
  chain?: boolean;
  main?: boolean;
};

export const Content = ({ content, chain, main }: ContentProps) => {
  const navigate = useNavigate();

  const { date_posted, text, img_url, vid_url, is_reply } = content;
  const { handle, name, avatar } = content.user_data;

  const handleClick = (e: SyntheticEvent) => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains('linkable')) {
      if ('post_id' in content) {
        navigate(`/${handle}/post/${content.post_id}`);
      }
      if ('message_id' in content && !is_reply) {
        navigate(`/messages/${content.message_id}`);
      }
    }
  };

  const handleLike = async () => {
    if ('post_id' in content) {
      try {
        const docRef = doc(db, 'posts', content.post_id).withConverter(
          postConverter
        );
        const newLikes = await runTransaction(db, async (transaction) => {
          const doc = await transaction.get(docRef);
          if (!doc.exists()) {
            throw 'Document does not exist!';
          }

          const newLikeCount = doc.data().likes + 1;
          if (newLikeCount <= 1000) {
            transaction.update(docRef, { likes: newLikeCount });
            return newLikeCount;
          } else {
            return Promise.reject('Sorry! Likes count is too big');
          }
        });

        console.log('Likes increased to ', newLikes);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <ContentContainer
      className="linkable"
      chain={chain}
      main={main}
      onClick={handleClick}
    >
      <Info className="linkable">
        <AvatarLink to={`/${handle}`}>
          <Avatar src={avatar} />
        </AvatarLink>
        <Name to={`/${handle}`}>{name}&nbsp;</Name>
        <Handle to={`/${handle}`}>{`@${handle}`}&nbsp;</Handle>
        <DatePosted>
          &#x2022;&nbsp;{formatDistanceToNowStrict(date_posted)}
        </DatePosted>
      </Info>
      <Linker chain={chain} />
      <Body className="linkable">
        <Text>{text}</Text>
        {img_url && <Img src={img_url} />}
        {vid_url && <Img src={vid_url} />}
      </Body>
      {'post_id' in content && (
        <Engagement className="linkable">
          <EngagementSubcontainer>
            <FontAwesomeIcon icon={regular('comments')} />
            <EngagementText>{content.replies}</EngagementText>
          </EngagementSubcontainer>
          <EngagementSubcontainer>
            <FontAwesomeIcon icon={solid('retweet')} />
            <EngagementText>{content.reposts}</EngagementText>
          </EngagementSubcontainer>
          <EngagementSubcontainer onClick={handleLike}>
            <FontAwesomeIcon icon={regular('heart')} />
            <EngagementText>{content.likes}</EngagementText>
          </EngagementSubcontainer>
        </Engagement>
      )}
    </ContentContainer>
  );
};
