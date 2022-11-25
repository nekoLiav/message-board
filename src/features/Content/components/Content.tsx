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
    if (!target.classList.contains('no-post')) {
      if ('post_id' in content) {
        navigate(`/${handle}/post/${content.post_id}`);
      }
      if ('message_id' in content && !is_reply) {
        navigate(`/messages/${content.message_id}`);
      }
    }
  };

  return (
    <ContentContainer chain={chain} main={main} onClick={handleClick}>
      <Info>
        <AvatarLink className="no-post" to={`/${handle}`}>
          <Avatar className="no-post" src={avatar} />
        </AvatarLink>
        <Name className="no-post" to={`/${handle}`}>
          {name}&nbsp;
        </Name>
        <Handle className="no-post" to={`/${handle}`}>
          {`@${handle}`}&nbsp;
        </Handle>
        <DatePosted className="no-post">
          &#x2022;&nbsp;{formatDistanceToNowStrict(date_posted)}
        </DatePosted>
      </Info>
      <Linker chain={chain} />
      <Body>
        <Text>{text}</Text>
        {img_url && <Img src={img_url} />}
        {vid_url && <Img src={vid_url} />}
      </Body>
      {'post_id' in content && (
        <Engagement>
          <EngagementSubcontainer className="no-post">
            <FontAwesomeIcon className="no-post" icon={regular('comments')} />
            <EngagementText className="no-post">
              {content.replies}
            </EngagementText>
          </EngagementSubcontainer>
          <EngagementSubcontainer className="no-post">
            <FontAwesomeIcon className="no-post" icon={solid('retweet')} />
            <EngagementText className="no-post">
              {content.reposts}
            </EngagementText>
          </EngagementSubcontainer>
          <EngagementSubcontainer className="no-post">
            <FontAwesomeIcon className="no-post" icon={regular('heart')} />
            <EngagementText className="no-post">{content.likes}</EngagementText>
          </EngagementSubcontainer>
        </Engagement>
      )}
    </ContentContainer>
  );
};
