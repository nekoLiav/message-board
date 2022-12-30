import { useState, useEffect } from 'react';
import { useHomePostsQuery, useLoggedInUserDataQuery } from 'api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'config';

export const useHome = () => {
  const [loggedInUserId, setLoggedInUserId] = useState<string | undefined>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUserId(user.uid);
      }
    });
  }, []);

  const {
    data: homePosts,
    error: homePostsError,
    isLoading: homePostsIsLoading,
  } = useHomePostsQuery();

  const {
    data: loggedInUserData,
    error: loggedInUserDataError,
    isLoading: loggedInUserDataIsLoading,
  } = useLoggedInUserDataQuery(loggedInUserId);

  return {
    homePosts,
    homePostsError,
    homePostsIsLoading,
    loggedInUserData,
    loggedInUserDataError,
    loggedInUserDataIsLoading,
  };
};
