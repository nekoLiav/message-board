/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db, userID } from '../firebase/firebase-config';
import { getDocs, collection } from 'firebase/firestore';
import Post from './Post';
import Header from './Header';
import PostSubmission from './PostSubmission';
import PropTypes from 'prop-types';

const StyledHome = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
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
        const querySnapshot = await getDocs(collection(db, 'posts'));
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
        <PostSubmission user={props.user.id} />
        <HomePosts>
          {isUpdated
            ? posts.map((post, index) => <Post key={index} post={post} />)
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
