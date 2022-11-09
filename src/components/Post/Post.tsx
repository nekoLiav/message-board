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
import { Div } from '../../Styles/Div';

const StyledPost = styled(Div)`
  display: flex;
  background: ${(props) => (props.main ? props.theme.main : props.theme.bg)};
  border-bottom-width: ${(props) => (props.chain ? '0' : '1px')};
  transition: 0.2s;

  &:hover {
    background: ${(props) =>
      props.main ? props.theme.mainmo : props.theme.main};
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
  color: ${(props) => props.theme.fg2};
  font-size: 0.875rem;
`;

const PostPropTypes = {
  post: PostType.isRequired,
  chain: PropTypes.bool,
  main: PropTypes.bool,
};

type PostProps = InferProps<typeof PostPropTypes>;

const Post = ({ post, chain, main }: PostProps) => {
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
    navigate(`/${postUser.handle}/post/${post.post_id}`);
  };

  return (
    <StyledPost chain={chain} main={main} onClick={handleClick}>
      {postLoaded && (
        <PostMain>
          <PostLeft>
            <PostAvatar user={postUser} />
            {chain === true ? <PostLinker /> : null}
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
};

Post.propTypes = PostPropTypes;

export default Post;
