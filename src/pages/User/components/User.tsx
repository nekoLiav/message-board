import { useState } from 'react';
import { UserContainer } from './style';
import { Profile } from './Profile';
import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import { isLoader } from '../types/isLoader';
import { isPost } from '../../../types/isPost';
// import { isUser } from '../types/isUser';

export const User = () => {
  const [messageToggle, setMessageToggle] = useState(false);
  const loader = useLoaderData();
  // const { user } = useRouteLoaderData('app');

  const toggleDM = () => {
    setMessageToggle(!messageToggle);
  };

  if (isLoader(loader)) {
    return (
      <UserContainer>
        {/* {loader.user && isUser(loader.user) ? (
          <Profile user={loader.user} toggleDM={toggleDM} />
        ) : null}
        {messageToggle && loader.user && isUser(loader.user) ? (
          <ContentSubmission
            clientUser={clientUser}
            recipient={loader.user.id}
          />
        ) : null} */}
        {loader.userPosts &&
          loader.userPosts.map((post) => {
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
