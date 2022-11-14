import * as PropTypes from 'prop-types';
import { MessagePropType } from '../../types/PropTypes';
import { formatDistanceToNowStrict } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { SyntheticEvent } from 'react';
import {
  MessageContainer,
  AvatarLink,
  Avatar,
  Linker,
  Info,
  Name,
  Handle,
  DateMessaged,
  Content,
  Text,
  Img,
} from './style';

type MessageProps = {
  message: MessageType;
  chain?: boolean;
};

const Message = ({ message, chain }: MessageProps) => {
  const navigate = useNavigate();

  const { handle, name, avatar } = message.user_data;
  const { date_posted, text, img_url, vid_url } = message;

  const handleClick = (e: SyntheticEvent) => {
    const target = e.target as HTMLDivElement;
    if (!target.classList.contains('no-link') && !message.is_reply) {
      navigate(`/messages/${message.message_id}`);
    }
  };

  return (
    <MessageContainer chain={chain} onClick={handleClick}>
      <AvatarLink className="no-link" to={`/${handle}`}>
        <Avatar className="no-link" src={avatar} />
      </AvatarLink>
      <Linker chain={chain} />
      <Info>
        <Name className="no-link" to={`/${handle}`}>
          {name}&nbsp;
        </Name>
        <Handle className="no-link" to={`/${handle}`}>
          {`@${handle}`}&nbsp;
        </Handle>
        <DateMessaged className="no-link">
          &#x2022;&nbsp;{formatDistanceToNowStrict(date_posted)}
        </DateMessaged>
      </Info>
      <Content>
        <Text>{text}</Text>
        {img_url === null ? null : <Img src={img_url} />}
        {vid_url === null ? null : <Img src={vid_url} />}
      </Content>
    </MessageContainer>
  );
};

Message.propTypes = {
  message: MessagePropType.isRequired,
  chain: PropTypes.bool,
};

export default Message;
