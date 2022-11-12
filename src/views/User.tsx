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
  const [user, setUser] = useState<UserType>();
  const [userPosts, setUserPosts] = useState<PostType[]>();
  const { handle } = useParams();

  useEffect(() => {
    (async () => {
      if (handle) {
        const userData = await getUserByHandle(handle);
        if (userData) {
          setUser(userData);
          const userPostsData = await getUserPosts(userData.id);
          setUserPosts(userPostsData);
        }
      }
    })();
  }, []);

  return (
    <Div>
      {user && <UserProfile user={user} />}
      <PostContainer>
        {userPosts &&
          userPosts.map((post) => <Post key={post.post_id} post={post} />)}
      </PostContainer>
    </Div>
  );
};

export default User;
