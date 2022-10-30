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
  border: 1px solid grey;
`;

const HomeMain = styled.div`
  border: 1px solid grey;
`;

const HomePosts = styled.div`
  border: 1px solid grey;
`;

const HomeAside = styled.div`
  border: 1px solid grey;
`;

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
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
            id: doc.id,
            name: doc.name,
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
        {props.isLoggedIn ? <PostSubmission user={props.user.id} /> : null}
        <HomePosts>
          {isUpdated
            ? posts.map((post) => <Post key={post.id} post={post} />)
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
