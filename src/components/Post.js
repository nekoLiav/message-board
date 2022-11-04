import styled from 'styled-components';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  width: 100%;
  height: max-content;
  border-width: 0 0 1px 0;
  border-color: grey;
  border-style: solid;
  min-height: 100px;
  transition: 0.2s;
  max-width: 600px;
  max-height: 800px;
  padding: 1rem;

  &:hover {
    background: #111111;
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;

const Container2 = styled.div`
  display: flex;
  margin-top: 0.25rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const UserAvatar = styled.img`
  background: #111111;
  width: 50px;
  height: 50px;
  border-radius: 100%;
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

const Body = styled.div``;

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

  useEffect(() => {
    const getUser = async () => {
      try {
        const docRef = doc(db, 'users', props.post.user);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data());
        setPostLoaded(true);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    };
    getUser();
  }, []);

  const navigate = useNavigate();

  const created = formatDistanceToNowStrict(props.post.date_posted);
  const createdString = `${created.split(' ')[0]}${created.split(' ')[1][0]}`;

  const handleClick = (clickEvent) => {
    clickEvent.preventDefault();
    navigate(`/user/${props.post.user}/post/${props.post.id}`);
  };

  return (
    <StyledPost onClick={handleClick}>
      {postLoaded ? (
        <Container>
          <UserAvatar src={userData.avatar} />
          <Info>
            <Container2>
              <UserName>{userData.name}&nbsp;</UserName>
              <UserHandle>{`@${userData.handle}`}&nbsp;</UserHandle>
              <DateCreated>&#x2022;&nbsp;{createdString}</DateCreated>
            </Container2>
            <Body>
              <Text>{props.post.text}</Text>
              {props.post.img !== null ? <Img src={props.post.img} /> : null}
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
    id: PropTypes.string,
    img: PropTypes.string,
    is_reply: PropTypes.bool,
    text: PropTypes.string,
    user: PropTypes.string,
  }),
};

export default Post;
