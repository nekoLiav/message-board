/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebase/firebase-config';
import {
  getDocs,
  query,
  where,
  collection,
  setDoc,
  doc,
} from 'firebase/firestore';
import Header from './Header';
import PostSubmission from './PostSubmission';
import PropTypes from 'prop-types';
import UserData from '../Users.json';
import PostData from '../Posts.json';
import ReplyData from '../Replies.json';
import SpecialUserData from '../SpecialUsers.json';
import PostUser from './Post/PostUser';
import Post from './Post/Post';

const StyledHome = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr minmax(min-content, 600px) 1fr;
  height: 100%;
  background: black;
  overflow: auto;
  color: white;
`;

const HomeMain = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 0 1px 0 1px;
  border-style: solid;
  border-color: grey;
`;

const HomeInfo = styled.div`
  display: flex;
  align-items: baseline;
  height: 27px;
`;

const HomeName = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
`;

const HomePosts = styled.div``;

const populateDB = () => {
  let randomUserIDs = [];
  UserData.forEach((user) => {
    let n = 0;
    const newUserDoc = doc(collection(db, 'users'));
    randomUserIDs.push(newUserDoc.id);
    setDoc(newUserDoc, user);
    for (let i = 0; i < 10; i++) {
      const newPostDoc = doc(collection(db, 'posts'));
      setDoc(newPostDoc, {
        ...PostData[i + n * 10],
        user: newUserDoc.id,
        date_posted: Number(PostData[i + n * 10].date_posted),
      });
    }
    n++;
  });
  for (let i = 0; i < ReplyData.length; i++) {
    const newReplyDoc = doc(collection(db, 'posts'));
    setDoc(newReplyDoc, {
      ...ReplyData[i],
      user: randomUserIDs[Math.floor(Math.random() * randomUserIDs.length)],
      parent: randomUserIDs[Math.floor(Math.random() * randomUserIDs.length)],
      date_posted: Number(ReplyData[i].date_posted),
    });
  }
};

const populateSpecialDB = () => {
  SpecialUserData.forEach((specialUser) => {
    setDoc(doc(db, 'users', specialUser.id), specialUser);
  });
};

// populateSpecialDB();
// populateDB();

const HomeAside = styled.div``;

const Home = (props) => {
  const [homePosts, setHomePosts] = useState([]);
  const [homeUpdated, setHomeUpdated] = useState(false);

  useEffect(() => {
    (async () => {
      const postsRef = query(
        collection(db, 'posts'),
        where('is_reply', '==', false)
      );
      const postsSnap = await getDocs(postsRef);
      let tempPosts = [];
      postsSnap.forEach((post) => tempPosts.push(post.data()));
      setHomePosts(tempPosts);
      setHomeUpdated(true);
    })();
  }, []);

  return (
    <StyledHome>
      <Header />
      {homeUpdated ? (
        <HomeMain>
          <HomeInfo>
            <HomeName>Home&nbsp;&#x2022;&nbsp;</HomeName>
            <PostUser name={props.user.name} handle={props.user.handle} />
          </HomeInfo>
          <PostSubmission id={props.user.id} avatar={props.user.avatar} />
          <HomePosts>
            {homePosts.map((post) => (
              <Post key={post.post_id} post={post} />
            ))}
          </HomePosts>
        </HomeMain>
      ) : null}
      <HomeAside />
    </StyledHome>
  );
};

Home.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    handle: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

export default Home;
