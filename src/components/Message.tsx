import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MessagePropType } from '../types/PropTypes';
import { Div } from '../styles/Div';
import { formatDistanceToNowStrict } from 'date-fns';

const StyledMessage = styled(Div)<{
  chain: boolean | undefined;
}>`
  display: grid;
  grid-template-columns: min-content repeat(4, minmax(min-content, 1fr)) 0.5rem;
  grid-template-rows: repeat(2, 1rem) 1.5rem 1fr 1.5rem;
  background: ${(props) => props.theme.bg};
  border-bottom-width: ${(props) => (props.chain ? '0' : '1px')};
  transition: 0.2s;

  &:hover {
    background: ${(props) => props.theme.main};
    cursor: pointer;
  }
`;

const AvatarLink = styled(Link)`
  max-width: 3rem;
  max-height: 3rem;
  margin: 0.5rem;
  grid-area: 1 / 1 / 3 / 2;
`;

const Avatar = styled.img`
  display: block;
  max-width: 3rem;
  max-height: 3rem;
  border-radius: 100%;
`;

const Linker = styled.div<{ chain: boolean | undefined }>`
  display: ${(props) => (props.chain ? 'block' : 'none')};
  background: ${(props) => props.theme.y};
  width: 2px;
  justify-self: center;
  margin-top: 0.5rem;
  grid-area: 4 / 1 / 6 / 2;
`;

const Info = styled.div`
  display: flex;
  grid-area: 1 / 2 / 3 / 6;
`;

const UserName = styled(Link)`
  align-self: center;
  font-weight: bold;
  text-decoration: none;
  color: ${(props) => props.theme.primary};
  font-size: 0.875rem;

  &:hover {
    text-decoration: underline;
  }
`;

const UserHandle = styled(Link)`
  align-self: center;
  color: ${(props) => props.theme.secondary};
  text-decoration: none;
  font-size: 0.875rem;

  &:hover {
    text-decoration: underline;
  }
`;

const DateMessaged = styled.p`
  align-self: center;
  color: ${(props) => props.theme.secondary};
  font-size: 0.875rem;
`;

const Content = styled.div`
  grid-area: 3 / 2 / 5 / 6;
`;

const Text = styled.p`
  overflow-wrap: anywhere;
  font-size: 0.875rem;
`;

const Img = styled.img`
  display: block;
  border: 1px solid grey;
  border-radius: 15px;
  max-width: 100%;
  margin-top: 0.5rem;
`;

type MessageProps = {
  message: MessageType;
  chain?: boolean;
};

const Message = ({ message, chain }: MessageProps) => {
  const { handle, name, avatar } = message.user_data;
  const { date_posted, text, img_url, vid_url } = message;

  return (
    <StyledMessage chain={chain}>
      <AvatarLink className="no-Message" to={`/${handle}`}>
        <Avatar className="no-Message" src={avatar} />
      </AvatarLink>
      <Linker chain={chain} />
      <Info>
        <UserName className="no-Message" to={`/${handle}`}>
          {name}&nbsp;
        </UserName>
        <UserHandle className="no-Message" to={`/${handle}`}>
          {`@${handle}`}&nbsp;
        </UserHandle>
        <DateMessaged className="no-Message">
          &#x2022;&nbsp;{formatDistanceToNowStrict(date_posted)}
        </DateMessaged>
      </Info>
      <Content>
        <Text>{text}</Text>
        {img_url === null ? null : <Img src={img_url} />}
        {vid_url === null ? null : <Img src={vid_url} />}
      </Content>
    </StyledMessage>
  );
};

Message.propTypes = {
  message: MessagePropType.isRequired,
  chain: PropTypes.bool,
};

export default Message;
