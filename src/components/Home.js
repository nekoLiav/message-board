/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebase/firebase-config';
import {
  getDocs,
  query,
  where,
  collection,
  limit,
  setDoc,
  doc,
  orderBy,
} from 'firebase/firestore';
import Post from './Post';
import Header from './Header';
import PostSubmission from './PostSubmission';
import PropTypes from 'prop-types';
import UserData from '../Users.json';
import PostData from '../Posts.json';
import ReplyData from '../Replies.json';
import SpecialUserData from '../SpecialUsers.json';

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

const HomeLoc = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  margin-left: 1rem;
`;

const Container = styled.div``;

const HomeInfo = styled.div`
  display: flex;
  margin-left: 1rem;
`;

const UserName = styled.p``;

const UserHandle = styled.p`
  color: grey;
`;

const HomePosts = styled.div`
  border-top-width: 1px;
  border-top-color: grey;
  border-top-style: solid;
`;

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
  const [posts, setPosts] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const queryPosts = async () => {
      try {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, orderBy('date_posted', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        let tempPosts = [];
        querySnapshot.forEach((doc) => {
          tempPosts.push(doc.data());
        });
        setPosts(tempPosts);
        setIsUpdated(true);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    };
    queryPosts();
  }, []);

  return (
    <StyledHome>
      <Header />
      <HomeMain>
        <HomeLoc>Home</HomeLoc>
        {props.isLoggedIn ? (
          <Container>
            <HomeInfo>
              <UserName>{props.user.name}</UserName>
              <UserHandle>&nbsp;{`@${props.user.handle}`}</UserHandle>
            </HomeInfo>
            <PostSubmission user={props.user} type={'post'} />
          </Container>
        ) : null}
        <HomePosts>
          {isUpdated
            ? posts.map((post) => (
                <Post key={post.post_id} post={post} user={props.user} />
              ))
            : null}
        </HomePosts>
      </HomeMain>
      <HomeAside />
    </StyledHome>
  );
};

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    handle: PropTypes.string,
  }),
};

export default Home;
