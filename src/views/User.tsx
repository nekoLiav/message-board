import { useState } from 'react';
import { useEffect } from 'react';
import { getUserPosts } from '../functions/getUserPostsByID';
import Post from '../components/Post';
import UserProfile from '../components/UserProfile';
import { Div } from '../styles/Div';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { getUserByHandle } from '../functions/getUserByHandle';
import PostSubmission from '../components/PostSubmission';
import { isUser } from '../functions/assertUnknowns';

const PostContainer = styled(Div)`
  border-width: 1px 0 0 0;
`;

const User = () => {
  const [user, setUser] = useState<UserType>();
  const [userPosts, setUserPosts] = useState<PostType[]>();
  const [messageToggle, setMessageToggle] = useState<boolean>();
  const clientUser = isUser(useRouteLoaderData('app'));
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

  const toggleDM = () => {
    setMessageToggle(!messageToggle);
  };

  return (
    <Div>
      {user && <UserProfile user={user} toggleDM={toggleDM} />}
      {messageToggle && (
        <PostSubmission
          clientUser={clientUser}
          recipient={user}
          type={'message'}
        />
      )}
      <PostContainer>
        {userPosts &&
          userPosts.map((post) => <Post key={post.post_id} post={post} />)}
      </PostContainer>
    </Div>
  );
};

export default User;
