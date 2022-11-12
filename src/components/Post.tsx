import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import { PostPropType } from '../types/PropTypes';
import { Div } from '../styles/Div';
import { formatDistanceToNowStrict } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { SyntheticEvent } from 'react';

const StyledPost = styled(Div)<{
  chain: boolean | undefined;
  main: boolean | undefined;
}>`
  display: grid;
  grid-template-columns: min-content repeat(4, minmax(min-content, 1fr)) 0.5rem;
  grid-template-rows: repeat(2, 1rem) 1.5rem 1fr 1.5rem;
  background: ${(props) => (props.main ? props.theme.main : props.theme.bg)};
  border-bottom-width: ${(props) => (props.chain ? '0' : '1px')};
  transition: 0.2s;

  &:hover {
    background: ${(props) =>
      props.main ? props.theme.mainmo : props.theme.main};
    cursor: pointer;
  }
`;

const AvatarLink = styled(Link)`
  max-width: 3rem;
  max-height: 3rem;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 3;
  margin: 0.5rem;
`;

const Avatar = styled.img`
  display: block;
  max-width: 3rem;
  max-height: 3rem;
  border-radius: 100%;
`;

const Linker = styled.div<{ chain: boolean | undefined }>`
  display: ${(props) => (props.chain ? 'block' : 'none')};
  background: ${(props) => props.theme.brd};
  width: 2px;
  justify-self: center;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 4;
  grid-row-end: 6;
  margin-top: 0.5rem;
`;

const Info = styled.div`
  display: flex;
  grid-column-start: 2;
  grid-column-end: 6;
  grid-row-start: 1;
  grid-row-end: 3;
`;

const UserName = styled(Link)`
  align-self: center;
  font-weight: bold;
  text-decoration: none;
  color: ${(props) => props.theme.fg};
  font-size: 0.875rem;

  &:hover {
    text-decoration: underline;
  }
`;

const UserHandle = styled(Link)`
  align-self: center;
  color: ${(props) => props.theme.fg2};
  text-decoration: none;
  font-size: 0.875rem;

  &:hover {
    text-decoration: underline;
  }
`;

const DatePosted = styled.p`
  align-self: center;
  color: ${(props) => props.theme.fg2};
  font-size: 0.875rem;
`;

const Content = styled.div`
  grid-column-start: 2;
  grid-column-end: 6;
  grid-row-start: 3;
  grid-row-end: 5;
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

const Replies = styled.div`
  display: flex;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 5;
  grid-row-end: 6;
  width: min-content;
  gap: 0.5rem;
  align-items: center;
  color: ${(props) => props.theme.fg2};

  &:hover {
    color: #00ffff;
  }
`;

const RepliesCount = styled.p`
  font-weight: bold;
  font-size: 0.75rem;
`;

const Reposts = styled.div`
  display: flex;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 5;
  grid-row-end: 6;
  width: min-content;
  gap: 0.5rem;
  align-items: center;
  color: ${(props) => props.theme.fg2};

  &:hover {
    color: #00ff00;
  }
`;

const RepostsCount = styled.p`
  font-weight: bold;
  font-size: 0.75rem;
`;

const Likes = styled.div`
  display: flex;
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 5;
  grid-row-end: 6;
  width: min-content;
  gap: 0.5rem;
  align-items: center;
  color: ${(props) => props.theme.fg2};

  &:hover {
    color: #ff00ff;
  }
`;

const LikesCount = styled.p`
  font-weight: bold;
  font-size: 0.75rem;
`;

type PostProps = {
  post: PostType;
  main?: boolean;
  chain?: boolean;
};

const Post = ({ post, chain, main }: PostProps) => {
  const navigate = useNavigate();

  const { handle, name, avatar } = post.user_data;
  const {
    date_posted,
    post_id,
    text,
    img_url,
    vid_url,
    replies,
    reposts,
    likes,
  } = post;

  const handleClick = (e: SyntheticEvent) => {
    const target = e.target as HTMLDivElement;
    if (!target.classList.contains('no-post')) {
      navigate(`/${handle}/post/${post_id}`);
    }
  };

  return (
    <StyledPost chain={chain} main={main} onClick={handleClick}>
      <AvatarLink className="no-post" to={`/${handle}`}>
        <Avatar className="no-post" src={avatar} />
      </AvatarLink>
      <Linker chain={chain} />
      <Info>
        <UserName className="no-post" to={`/${handle}`}>
          {name}&nbsp;
        </UserName>
        <UserHandle className="no-post" to={`/${handle}`}>
          {`@${handle}`}&nbsp;
        </UserHandle>
        <DatePosted className="no-post">
          &#x2022;&nbsp;{formatDistanceToNowStrict(date_posted)}
        </DatePosted>
      </Info>
      <Content>
        <Text>{text}</Text>
        {img_url === null ? null : <Img src={img_url} />}
        {vid_url === null ? null : <Img src={vid_url} />}
      </Content>
      <Replies className="no-post">
        <FontAwesomeIcon className="no-post" icon={regular('comments')} />
        <RepliesCount className="no-post">{replies}</RepliesCount>
      </Replies>
      <Reposts className="no-post">
        <FontAwesomeIcon className="no-post" icon={solid('retweet')} />
        <RepostsCount className="no-post">{reposts}</RepostsCount>
      </Reposts>
      <Likes className="no-post">
        <FontAwesomeIcon className="no-post" icon={regular('heart')} />
        <LikesCount className="no-post">{likes}</LikesCount>
      </Likes>
    </StyledPost>
  );
};

Post.propTypes = {
  post: PostPropType.isRequired,
  chain: PropTypes.bool,
  main: PropTypes.bool,
};

export default Post;
