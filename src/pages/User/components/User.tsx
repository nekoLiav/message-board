import { useState } from 'react';
import { UserContainer } from './style';
import { Profile } from './Profile';
import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';

type AppLoader = {
  currentUser?: UserType;
};

type UserProfileLoader = {
  user: UserType;
  userPosts?: PostType[];
};

export const User = () => {
  const [messageToggle, setMessageToggle] = useState(false);
  const { currentUser } = useRouteLoaderData('app') as AppLoader;
  const { user, userPosts } = useLoaderData() as UserProfileLoader;

  const toggleDM = () => {
    setMessageToggle(!messageToggle);
  };

  return (
    <UserContainer>
      {user && <Profile user={user} toggleDM={toggleDM} />}
      {messageToggle && currentUser && user ? (
        <ContentSubmission currentUser={currentUser} recipient={user.id} />
      ) : null}
      {userPosts &&
        userPosts.map((post) => <Content key={post.post_id} content={post} />)}
    </UserContainer>
  );
};
