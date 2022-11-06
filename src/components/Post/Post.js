import styled from 'styled-components';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict as fD } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import PostAvatar from './PostAvatar';
import PostUser from './PostUser';
import PostEngagement from './PostEngagement';
import PostContent from './PostContent';
import PostLinker from './PostLinker';

const StyledPost = styled.div``;

const PostContainer = styled.div`
  display: flex;
  color: white;
  border-width: 0 0 1px 0;
  border-color: grey;
  border-style: solid;
  transition: 0.2s;
  max-width: 600px;
  max-height: 800px;
  width: 100%;

  &:hover {
    background: #111111;
    cursor: pointer;
  }
`;

const Container2 = styled.div`
  display: flex;
  width: 100%;
`;

const Container3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  gap: 0.5rem;
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
      try {
        const docRef = doc(db, 'users', props.post.user_id);
        const docSnap = await getDoc(docRef);
        setPostUser(docSnap.data());
        setPostLoaded(true);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    })();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/${props.post.user_id}/post/${props.post.post_id}`);
  };

  return (
    <StyledPost>
      {postLoaded ? (
        <PostContainer
          style={props.chained ? { borderWidth: '0' } : {}}
          onClick={handleClick}
        >
          <Container3>
            <PostAvatar src={postUser.avatar} handle={postUser.handle} />
            {props.chained ? <PostLinker /> : null}
          </Container3>
          <Info>
            <Container2>
              <PostUser name={postUser.name} handle={postUser.handle} />
              <DatePosted>
                &#x2022;&nbsp;
                {fD(props.post.date_posted)}
              </DatePosted>
            </Container2>
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
          </Info>
        </PostContainer>
      ) : null}
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
  chained: PropTypes.bool,
};

export default Post;
