import { useState } from 'react';
import { useEffect } from 'react';
import getUserPosts from '../../functions/getUserPosts';
import Content from '../../components/Content/Content';
import Profile from '../../components/Profile/Profile';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import getUserByHandle from '../../functions/getUserByHandle';
import ContentSubmission from '../../components/ContentSubmission/ContentSubmission';
import { isUser } from '../../functions/assertUnknowns';
import { UserContainer } from './style';

const User = () => {
  const [user, setUser] = useState<UserType>();
  const [userPosts, setUserPosts] = useState<PostType[]>();
  const [messageToggle, setMessageToggle] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const clientUser = isUser(useRouteLoaderData('app'));
  const { handle } = useParams();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (handle) {
        const userData = await getUserByHandle(handle);
        if (userData) {
          setUser(userData);
          const userPostsData = await getUserPosts(userData.id);
          setUserPosts(userPostsData);
        }
      }
      setIsLoading(false);
    })();
  }, []);

  const toggleDM = () => {
    setMessageToggle(!messageToggle);
  };

  if (!isLoading && user) {
    return (
      <UserContainer>
        <Profile user={user} toggleDM={toggleDM} />
        {messageToggle && (
          <ContentSubmission clientUser={clientUser} recipient={user.id} />
        )}
        {userPosts &&
          userPosts.map((p) => <Content key={p.post_id} content={p} />)}
      </UserContainer>
    );
  }
  return null;
};

export default User;
