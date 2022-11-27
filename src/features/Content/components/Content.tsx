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
import postRepost from 'api/transactions/postRepost';
import postLike from 'api/transactions/postLike';

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

  const handleEngagement = (e: SyntheticEvent) => {
    if ('post_id' in content) {
      const id = e.currentTarget.id;
      if (id === 'like') {
        postLike(content.post_id);
      }
      if (id === 'repost') {
        postRepost(content.post_id);
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
          <EngagementSubcontainer className="linkable">
            <FontAwesomeIcon icon={regular('comments')} />
            <EngagementText>{content.replies}</EngagementText>
          </EngagementSubcontainer>
          <EngagementSubcontainer id="repost" onClick={handleEngagement}>
            <FontAwesomeIcon icon={solid('retweet')} />
            <EngagementText>{content.reposts}</EngagementText>
          </EngagementSubcontainer>
          <EngagementSubcontainer id="like" onClick={handleEngagement}>
            <FontAwesomeIcon icon={regular('heart')} />
            <EngagementText>{content.likes}</EngagementText>
          </EngagementSubcontainer>
        </Engagement>
      )}
    </ContentContainer>
  );
};
