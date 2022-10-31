/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebase/firebase-config';
import {
  getDocs,
  collection,
  addDoc,
  collectionGroup,
  query,
  where,
} from 'firebase/firestore';
import Post from './Post';
import Header from './Header';
import PostSubmission from './PostSubmission';
import PropTypes from 'prop-types';

const StyledHome = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr minmax(min-content, 600px) 1fr;
  height: 100%;
  background: black;
  overflow: auto;
`;

const HomeMain = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomePosts = styled.div`
  border-top-width: 1px;
  border-top-color: grey;
  border-top-style: solid;
`;

const HomeAside = styled.div``;

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const populateDummyDatabase = async () => {
      for (let i = 0; i < 10; i++) {
        const usersRef = collection(db, 'users');
        const user = await addDoc(usersRef, {
          name: `Test Name ${i}`,
        });

        const postsRef = collection(db, 'users', user.id, 'posts');
        const post = await addDoc(postsRef, {
          authorID: user.id,
          authorName: `Test Name ${i}`,
          body: `Submission ${i}`,
          created: Date.now(),
          type: 'submission',
        });
      }
    };
    const queryPosts = async () => {
      try {
        const fetchedPosts = query(
          collectionGroup(db, 'posts'),
          where('type', '==', 'submission')
        );
        const querySnapshot = await getDocs(fetchedPosts);
        let tempPosts = [];
        querySnapshot.forEach((doc) => {
          tempPosts.push({
            ...doc.data(),
            postID: doc.id,
          });
        });
        setPosts(tempPosts.sort((a, b) => a.created - b.created));
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
        {props.isLoggedIn ? (
          <PostSubmission user={props.user.id} />
        ) : (
          <PostSubmission />
        )}
        <HomePosts>
          {isUpdated
            ? posts.map((post) => <Post key={post.postID} post={post} />)
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
  }),
};

export default Home;
