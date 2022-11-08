import styled from 'styled-components';
import { InferProps } from 'prop-types';
import * as PropTypes from 'prop-types';
import { formatDistanceToNowStrict as f } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostAvatar from './PostAvatar';
import PostUser from './PostUser';
import PostEngagement from './PostEngagement';
import PostContent from './PostContent';
import PostLinker from './PostLinker';
import { getUser } from '../../Helpers/getUser';
import { PostType } from '../../Types/PropTypes';

const StyledPost = styled.div`
  display: flex;
  max-width: 600px;
  max-height: 800px;
  min-height: 100px;
  color: white;
  transition: 0.2s;
  border-color: grey;
  border-style: solid;
  border-bottom-width: ${(props) => (props.chain ? '0' : '1px')};
  background: ${(props) => (props.main ? '#111111' : 'black')};

  &:hover {
    background: ${(props) => (props.main ? '#222222' : '#111111')};
    cursor: pointer;
  }
`;

const PostMain = styled.div`
  display: flex;
  flex-grow: 1;
`;

const PostLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  gap: 0.5rem;
`;

const PostRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-right: 0.5rem;
`;

const PostRightTop = styled.div`
  display: flex;
`;

const DatePosted = styled.p`
  color: grey;
`;

const PostPropTypes = {
  post: PostType.isRequired,
  chain: PropTypes.bool,
  main: PropTypes.bool,
};

type PostProps = InferProps<typeof PostPropTypes>;

function Post({ post }, chain, main: PostProps) {
  const [postUser, setPostUser] = useState(null);
  const [postLoaded, setPostLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const postUserData = await getUser(post.user_id);
      setPostUser(postUserData);
      setPostLoaded(true);
    })();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/${post.user_id}/post/${post.post_id}`);
  };

  return (
    <StyledPost chain={chain} main={main} onClick={handleClick}>
      {postLoaded && (
        <PostMain>
          <PostLeft>
            <PostAvatar user={postUser} />
            {chain && <PostLinker />}
          </PostLeft>
          <PostRight>
            <PostRightTop>
              <PostUser user={postUser} />
              <DatePosted>&#x2022;&nbsp;{f(post.date_posted)}</DatePosted>
            </PostRightTop>
            <PostContent post={post} />
            <PostEngagement post={post} />
          </PostRight>
        </PostMain>
      )}
    </StyledPost>
  );
}

Post.propTypes = PostPropTypes;

export default Post;
