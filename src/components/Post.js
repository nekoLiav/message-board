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
  border-width: 0 1px 1px 1px;
  border-color: grey;
  border-style: solid;
  min-height: 100px;

  &:hover {
    background: #333333;
  }
`;

const Container = styled.div``;

const Info = styled.div`
  display: flex;
  padding: 5px;
`;

const UserName = styled.p``;

const UserHandle = styled.p`
  color: grey;
`;

const DateCreated = styled.p`
  color: grey;
`;

const Body = styled.div`
  padding: 5px;
`;

const Text = styled.p`
  padding-bottom: 5px;
`;

const Img = styled.img`
  border-radius: 10px;
  max-height: 400px;
`;

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

  const created = formatDistanceToNowStrict(Number(props.post.date_created));
  const createdString = `${created.split(' ')[0]}${created.split(' ')[1][0]}`;

  const handleClick = (clickEvent) => {
    clickEvent.preventDefault();
    navigate(`/user/${props.post.user}/post/${props.post.id}`);
  };

  return (
    <StyledPost onClick={handleClick}>
      {postLoaded ? (
        <Container>
          <Info>
            <UserName>{userData.name}&nbsp;</UserName>
            <UserHandle>{`@${userData.handle}`}`&nbsp;</UserHandle>
            <DateCreated>&#x2022;&nbsp;{createdString}</DateCreated>
          </Info>
          <Body>
            <Text>{props.post.text}</Text>
            {props.post.img_url !== null ? (
              <Img src={props.post.img_url} />
            ) : null}
          </Body>
        </Container>
      ) : null}
    </StyledPost>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    date_created: PropTypes.string,
    id: PropTypes.string,
    img_url: PropTypes.string,
    is_reply: PropTypes.string,
    text: PropTypes.string,
    user: PropTypes.string,
  }),
};

export default Post;
