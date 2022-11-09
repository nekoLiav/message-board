import { useState } from 'react';
import { useEffect } from 'react';
import { getUserPosts } from '../functions/getUserPostsByID';
import Post from '../components/Post';
import UserProfile from '../components/UserProfile';
import { Div } from '../styles/Div';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getUserByHandle } from '../functions/getUserByHandle';

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
      const userData = await getUserByHandle(params.handle);
      setUser(userData);
      setUserLoaded(true);
      const userPostData = await getUserPosts(userData.id);
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
