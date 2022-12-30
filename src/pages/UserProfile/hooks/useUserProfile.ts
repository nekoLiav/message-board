import { useState, useEffect } from 'react';
import { auth } from 'config';
import { onAuthStateChanged } from 'firebase/auth';
import { useLoggedInUserDataQuery, useUserProfileQuery } from 'api';
import { useParams } from 'react-router-dom';

export const useUserProfile = () => {
  const [loggedInUserId, setLoggedInUserId] = useState<string | undefined>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUserId(user.uid);
      }
    });
  }, []);

  const params = useParams();

  if (!params.post_id) {
    throw new Error("Error! Somehow there's no valid url. Try reloading.");
  }

  const {
    data: loggedInUserData,
    error: loggedInUserDataError,
    isLoading: loggedInUserDataIsLoading,
  } = useLoggedInUserDataQuery(loggedInUserId);

  const {
    data: userProfileData,
    error: userProfileDataError,
    isLoading: userProfileDataIsLoading,
  } = useUserProfileQuery(params.handle);

  return {
    loggedInUserData,
    loggedInUserDataError,
    loggedInUserDataIsLoading,
    userProfileData,
    userProfileDataError,
    userProfileDataIsLoading,
  };
};
