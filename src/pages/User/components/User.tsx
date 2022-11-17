import { useState } from 'react';
import { Content } from 'features/Content';
import { Profile } from './Profile';
import { useParams } from 'react-router-dom';
import { UserContainer } from './style';
import useUserProfile from './useUserProfile';
import useUserPosts from './useUserPosts';
import { Loading } from 'pages/Loading';
import { ErrorDisplay } from 'pages/ErrorDisplay';

export const User = () => {
  const [messageToggle, setMessageToggle] = useState(false);
  const { handle } = useParams();

  const {
    status: userStatus,
    data: user,
    error: userError,
  } = useUserProfile(handle);

  const userId = user?.id;

  const {
    status: userPostsStatus,
    data: userPosts,
    error: userPostsError,
  } = useUserPosts(userId);

  const toggleDM = () => {
    setMessageToggle(!messageToggle);
  };

  if (userStatus === 'loading') {
    return <Loading />;
  }

  if (userPostsStatus === 'loading') {
    return <Loading />;
  }

  if (userStatus === 'error') {
    if (userError instanceof Error) {
      return <ErrorDisplay>{userError.message}</ErrorDisplay>;
    }
    return <ErrorDisplay>Something went super duper wrong...</ErrorDisplay>;
  }

  if (userPostsStatus === 'error') {
    if (userPostsError instanceof Error) {
      return <ErrorDisplay>{userPostsError.message}</ErrorDisplay>;
    }
    return <ErrorDisplay>Something went super duper wrong...</ErrorDisplay>;
  }

  return (
    <UserContainer>
      <Profile user={user} toggleDM={toggleDM} />
      {/* {messageToggle && (
        <ContentSubmission clientUser={clientUser} recipient={userId} />
      )} */}
      {userPosts.map((post) => (
        <Content key={post.post_id} content={post} />
      ))}
    </UserContainer>
  );
};
