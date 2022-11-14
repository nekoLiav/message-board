import { useState } from 'react';
import { useEffect } from 'react';
import { getUserPosts } from '../functions/getUserPostsByID';
import Post from '../components/Post';
import Profile from '../components/Profile';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import { getUserByHandle } from '../functions/getUserByHandle';
import PostSubmission from '../components/PostSubmission';
import { isUser } from '../functions/assertUnknowns';

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
    <div>
      {user && <Profile user={user} toggleDM={toggleDM} />}
      {messageToggle && (
        <PostSubmission
          clientUser={clientUser}
          recipient={user}
          type={'message'}
        />
      )}
      <div>
        {userPosts &&
          userPosts.map((post) => <Post key={post.post_id} post={post} />)}
      </div>
    </div>
  );
};

export default User;
