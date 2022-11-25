import { useState } from 'react';
import { Profile } from './Profile';
import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
import { useLoaderData } from 'react-router-dom';

type UserProfileLoader = {
  currentUser: UserType;
  user: UserType;
  userPosts?: PostType[];
};

export const UserProfile = () => {
  const [messageToggle, setMessageToggle] = useState(false);
  const { currentUser, user, userPosts } = useLoaderData() as UserProfileLoader;

  const toggleDM = () => {
    setMessageToggle(!messageToggle);
  };

  return (
    <div>
      <Profile user={user} toggleDM={toggleDM} />
      {messageToggle && (
        <ContentSubmission currentUser={currentUser} recipient={user.id} />
      )}
      {userPosts &&
        userPosts.map((post) => <Content key={post.post_id} content={post} />)}
    </div>
  );
};
