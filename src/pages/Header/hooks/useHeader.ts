import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'config';
import { useLoggedInUserDataQuery } from 'api';

export const useHeader = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState<string | undefined>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setLoggedInUserId(user.uid);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  const {
    data: loggedInUserData,
    error: loggedInUserDataError,
    isLoading: loggedInUserDataIsLoading,
  } = useLoggedInUserDataQuery(loggedInUserId);

  return {
    loggedIn,
    loggedInUserData,
    loggedInUserDataError,
    loggedInUserDataIsLoading,
  };
};
