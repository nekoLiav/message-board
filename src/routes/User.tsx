import { useState } from 'react';
import { useEffect } from 'react';
import { getUserPosts } from '../functions/getUserPostsByID';
import Post from '../components/Post';
import UserProfile from '../components/UserProfile';
import { Div } from '../styles/Div';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getUserByHandle } from '../functions/getUserByHandle';
import { assertDefined } from '../functions/assertDefined';

const PostContainer = styled(Div)`
  border-width: 1px 0 0 0;
`;

const User = () => {
  const [user, setUser] = useState<UserType>();
  const [userPosts, setUserPosts] = useState<PostType[]>();
  const params = useParams();
  const paramsHandle = params.handle;
  assertDefined(paramsHandle, 'handle in User.tsx');

  useEffect(() => {
    (async () => {
      const userData = await getUserByHandle(paramsHandle);
      setUser(userData);
      assertDefined(userData, 'userData in User.tsx');
      const userPostsData = await getUserPosts(userData.id);
      setUserPosts(userPostsData);
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
