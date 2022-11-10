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
  const [userLoaded, setUserLoaded] = useState(false);
  const [userPosts, setUserPosts] = useState<PostType[]>([]);
  const [userPostsLoaded, setUserPostsLoaded] = useState(false);
  const params = useParams();

  useEffect(() => {
    (async () => {
      const userData: UserType = await getUserByHandle(params.handle);
      if (userData) {
        setUser(userData);
        setUserLoaded(true);
      }
      const userPostsData: PostType[] = await getUserPosts(userData.id);
      setUserPosts(userPostsData);
      setUserPostsLoaded(true);
    })();
  }, []);

  return (
    <Div>
      {userLoaded && user ? <UserProfile user={user} /> : null}
      <PostContainer>
        {userPostsLoaded &&
          userPosts.map((post) => <Post key={post.post_id} post={post} />)}
      </PostContainer>
    </Div>
  );
};

export default User;
