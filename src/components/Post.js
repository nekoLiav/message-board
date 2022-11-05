import styled from 'styled-components';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

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

const UserAvatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 100%;
`;

const Linker = styled.div`
  border: 1px solid grey;
  width: 1px;
  height: 100%;
  margin-top: 7px;
`;

const UserName = styled.p`
  font-weight: bold;
`;

const UserHandle = styled.p`
  color: grey;
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

const Info2 = styled.div`
  display: flex;
  justify-content: space-around;
  color: grey;
`;

const CommentContainer = styled.div`
  border-radius: 100%;
  padding: 5px;
  &:hover {
    background: rgba(0, 255, 255, 0.1);
    color: #00ffff;
  }
`;

const CommentCount = styled.p``;

const ShareContainer = styled.div`
  border-radius: 100%;
  padding: 5px;
  &:hover {
    background: rgba(128, 0, 255, 0.1);
    color: #8000ff;
  }
`;

const ShareCount = styled.p``;

const LikeContainer = styled.div`
  border-radius: 100%;
  padding: 5px;
  &:hover {
    background: rgba(255, 0, 255, 0.1);
    color: #ff00ff;
  }
`;

const LikeCount = styled.p``;

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

  const handleClick = (clickEvent) => {
    clickEvent.preventDefault();
    navigate(`/user/${props.post.user_id}/post/${props.post.post_id}`);
  };

  return (
    <StyledPost
      style={props.threadView ? { borderWidth: '0' } : {}}
      onClick={handleClick}
    >
      {postLoaded ? (
        <Container>
          <Container3>
            <UserAvatar src={userData.avatar} />
            {props.threadView ? <Linker /> : null}
          </Container3>
          <Info>
            <Container2>
              <UserName>{userData.name}&nbsp;</UserName>
              <UserHandle>{`@${userData.handle}`}&nbsp;</UserHandle>
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
            <Info2>
              <CommentContainer>
                <CommentCount>-- 123</CommentCount>
              </CommentContainer>
              <ShareContainer>
                <ShareCount>-- 123</ShareCount>
              </ShareContainer>
              <LikeContainer>
                <LikeCount>-- 123</LikeCount>
              </LikeContainer>
            </Info2>
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
    reply: PropTypes.bool,
    text: PropTypes.string,
    user_id: PropTypes.string,
  }),
  threadView: PropTypes.bool,
};

export default Post;
