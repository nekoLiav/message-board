import { useState } from 'react';
import { useEffect } from 'react';
import { getUserPosts } from '../components/User/getUserPosts';
import Post from '../components/Post/Post';
import UserProfile from '../components/User/UserProfile';
import { Div } from '../Styles/Div';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase-config';
import styled from 'styled-components';

const PostContainer = styled(Div)`
  border-width: 1px 0 0 0;
`;

const User = () => {
  const [user, setUser] = useState({});
  const [userLoaded, setUserLoaded] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [userPostsLoaded, setUserPostsLoaded] = useState(false);
  const params = useParams();

  useEffect(() => {
    (async () => {
      const userRef = query(
        collection(db, 'users'),
        where('handle', '==', params.handle)
      );
      const userSnap = await getDocs(userRef);
      setUser(userSnap.docs[0].data());
      setUserLoaded(true);
      const userPostData = await getUserPosts(userSnap.docs[0].data().id);
      setUserPosts(userPostData);
      setUserPostsLoaded(true);
    })();
  }, []);

  return (
    <Div>
      {userLoaded && <UserProfile user={user} />}
      <PostContainer>
        {userPostsLoaded &&
          userPosts.map((post) => <Post key={post.post_id} post={post} />)}
      </PostContainer>
    </Div>
  );
};

export default User;
