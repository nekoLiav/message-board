import * as PropTypes from 'prop-types';
import { MessagePropType } from '../../types/PropTypes';
import { formatDistanceToNowStrict } from 'date-fns';
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
  const { handle, name, avatar } = message.user_data;
  const { date_posted, text, img_url, vid_url } = message;

  return (
    <MessageContainer chain={chain}>
      <AvatarLink className="no-Message" to={`/${handle}`}>
        <Avatar className="no-Message" src={avatar} />
      </AvatarLink>
      <Linker chain={chain} />
      <Info>
        <Name className="no-Message" to={`/${handle}`}>
          {name}&nbsp;
        </Name>
        <Handle className="no-Message" to={`/${handle}`}>
          {`@${handle}`}&nbsp;
        </Handle>
        <DateMessaged className="no-Message">
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
