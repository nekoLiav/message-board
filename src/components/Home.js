/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebase/firebase-config';
import {
  getDocs,
  collectionGroup,
  query,
  where,
  doc,
  setDoc,
  collection,
  addDoc,
} from 'firebase/firestore';
import Post from './Post';
import Header from './Header';
import PostSubmission from './PostSubmission';
import PropTypes from 'prop-types';
import testdata from '../testdata.json';

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

// add users to mock

// testdata.users.forEach((user) => {
//   addDoc(collection(db, 'users'), user);
// });

// add posts to mock

// testdata.users.forEach((user) => {
//   let i = 0;
//   let p = 0;
//   const metadata = {
//     ...testdata.posts[p].metadata,
//     user_id: user.user_id,
//     user_name: user.user_name,
//     user_handle: user.user_handle,
//     user_avatar: user.user_avatar,
//   };
//   while (p < i + 10) {
//     addDoc(collection(db, 'posts'), {
//       ...testdata.posts[p],
//       metadata,
//     });
//     p++;
//   }
//   p = 0;
//   i += 10;
// });

const HomeAside = styled.div``;

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const queryPosts = async () => {
      try {
        const fetchedPosts = query(
          collectionGroup(db, 'posts'),
          where('parent', '!=', false)
        );
        const querySnapshot = await getDocs(fetchedPosts);
        let tempPosts = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
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
          <PostSubmission user={props.user.id} type={'submission'} />
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
