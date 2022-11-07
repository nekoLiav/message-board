import styled from 'styled-components';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict as f } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostAvatar from './PostAvatar';
import PostUser from './PostUser';
import PostEngagement from './PostEngagement';
import PostContent from './PostContent';
import PostLinker from './PostLinker';
import { getUser } from '../../Helpers/getUser';

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

function Post(props) {
  const [postUser, setPostUser] = useState(null);
  const [postLoaded, setPostLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const userData = await getUser(props.post.user_id);
      setPostUser(userData);
      setPostLoaded(true);
    })();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/${props.post.user_id}/post/${props.post.post_id}`);
  };

  return (
    <StyledPost chain={props.chain} main={props.main} onClick={handleClick}>
      {postLoaded && (
        <PostMain>
          <PostLeft>
            <PostAvatar avatar={postUser.avatar} handle={postUser.handle} />
            {props.chain && <PostLinker />}
          </PostLeft>
          <PostRight>
            <PostRightTop>
              <PostUser name={postUser.name} handle={postUser.handle} />
              <DatePosted>&#x2022;&nbsp;{f(props.post.date_posted)}</DatePosted>
            </PostRightTop>
            <PostContent
              text={props.post.text}
              img_url={props.post.img_url}
              vid_url={props.post.vid_url}
            />
            <PostEngagement
              replies={props.post.replies}
              reposts={props.post.reposts}
              likes={props.post.likes}
            />
          </PostRight>
        </PostMain>
      )}
    </StyledPost>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    date_posted: PropTypes.number,
    post_id: PropTypes.string,
    parent_ids: PropTypes.array,
    text: PropTypes.string,
    img_url: PropTypes.string,
    vid_url: PropTypes.string,
    user_id: PropTypes.string,
    replies: PropTypes.number,
    reposts: PropTypes.number,
    likes: PropTypes.number,
  }),
  chain: PropTypes.bool,
  main: PropTypes.bool,
};

export default Post;
