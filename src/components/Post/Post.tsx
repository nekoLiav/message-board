import * as PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { PostPropType } from '../../types/PropTypes';
import { formatDistanceToNowStrict } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { SyntheticEvent } from 'react';
import {
  PostContainer,
  AvatarLink,
  Avatar,
  Linker,
  Info,
  Name,
  Handle,
  DatePosted,
  Content,
  Text,
  Img,
  Replies,
  RepliesCount,
  Reposts,
  RepostsCount,
  Likes,
  LikesCount,
} from './style';

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
    <PostContainer chain={chain} main={main} onClick={handleClick}>
      <AvatarLink className="no-post" to={`/${handle}`}>
        <Avatar className="no-post" src={avatar} />
      </AvatarLink>
      <Linker chain={chain} />
      <Info>
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
    </PostContainer>
  );
};

Post.propTypes = {
  post: PostPropType.isRequired,
  chain: PropTypes.bool,
  main: PropTypes.bool,
};

export default Post;
