import styled from 'styled-components';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import PostAvatar from './PostAvatar';
import PostUser from './PostUser';
import PostEngagement from './PostEngagement';

const StyledPost = styled.div`
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

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const Container2 = styled.div`
  display: flex;
  width: 100%;
`;

const Container3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7px;
  margin-left: 1rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  gap: 0.5rem;
`;

const Linker = styled.div`
  border: 1px solid grey;
  width: 1px;
  height: 100%;
  margin-top: 7px;
`;

const DateCreated = styled.p`
  color: grey;
`;

const Body = styled.div`
  width: 100%;
`;

const Text = styled.p``;

const Img = styled.img`
  border-radius: 15px;
  max-width: 100%;
  margin-top: 1rem;
  border: 1px solid grey;
`;

function Post(props) {
  const [userData, setUserData] = useState(null);
  const [postLoaded, setPostLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const docRef = doc(db, 'users', props.post.user_id);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data());
        setPostLoaded(true);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    };
    getUser();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/${props.post.user_id}/post/${props.post.post_id}`);
  };

  return (
    <StyledPost
      style={props.threadView ? { borderWidth: '0' } : {}}
      onClick={handleClick}
    >
      {postLoaded ? (
        <Container>
          <Container3>
            <PostAvatar src={userData.avatar} handle={userData.handle} />
            {props.threadView ? <Linker /> : null}
          </Container3>
          <Info>
            <Container2>
              <PostUser name={userData.name} handle={userData.handle} />
              <DateCreated>
                &#x2022;&nbsp;
                {formatDistanceToNowStrict(props.post.date_posted)}
              </DateCreated>
            </Container2>
            <Body>
              <Text>{props.post.text}</Text>
              {props.post.img_url !== null ? (
                <Img src={props.post.img_url} />
              ) : null}
            </Body>
            <PostEngagement
              replies={props.post.replies}
              reposts={props.post.reposts}
              likes={props.post.likes}
            />
          </Info>
        </Container>
      ) : null}
    </StyledPost>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    date_posted: PropTypes.number,
    post_id: PropTypes.string,
    id: PropTypes.string,
    img_url: PropTypes.string,
    text: PropTypes.string,
    user_id: PropTypes.string,
    replies: PropTypes.number,
    reposts: PropTypes.number,
    likes: PropTypes.number,
  }),
  threadView: PropTypes.bool,
};

export default Post;
