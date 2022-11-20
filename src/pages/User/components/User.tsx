import { useState } from 'react';
import { UserContainer } from './style';
import { Profile } from './Profile';
import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import { isUserProfileLoader } from '../types/isUserProfileLoader';
import { isPost } from 'types/isPost';
import { isAppLoader } from 'types/isAppLoader';
import { isUser } from 'types/isUser';

export const User = () => {
  const [messageToggle, setMessageToggle] = useState(false);
  const userProfileLoader = useLoaderData();
  const appLoader = useRouteLoaderData('app');

  const toggleDM = () => {
    setMessageToggle(!messageToggle);
  };

  if (isUserProfileLoader(userProfileLoader) && isAppLoader(appLoader)) {
    const { user, userPosts } = userProfileLoader;
    const { currentUser } = appLoader;

    return (
      <UserContainer>
        {isUser(user) && <Profile user={user} toggleDM={toggleDM} />}
        {messageToggle && isUser(currentUser) && isUser(user) ? (
          <ContentSubmission currentUser={currentUser} recipient={user.id} />
        ) : null}
        {userPosts &&
          userPosts.map((post) => {
            if (isPost(post)) {
              return <Content key={post.post_id} content={post} />;
            } else {
              return null;
            }
          })}
      </UserContainer>
    );
  }

  return null;
};
