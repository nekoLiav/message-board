import { useState, useEffect } from 'react';
import { auth } from 'config';
import { onAuthStateChanged } from 'firebase/auth';
import { useLoggedInUserDataQuery, useMessageThreadQuery } from 'api';
import { useParams } from 'react-router-dom';

export const useMessageThread = () => {
  const [loggedInUserId, setLoggedInUserId] = useState<string | undefined>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUserId(user.uid);
      }
    });
  }, []);

  const { message_id } = useParams();

  if (!message_id) {
    throw new Error("Error! Somehow there's no valid url. Try reloading.");
  }

  const {
    data: loggedInUserData,
    error: loggedInUserDataError,
    isLoading: loggedInUserDataIsLoading,
  } = useLoggedInUserDataQuery(loggedInUserId);

  const {
    data: messageThreadData,
    error: messageThreadError,
    isLoading: messageThreadIsLoading,
  } = useMessageThreadQuery(message_id);

  return {
    loggedInUserData,
    loggedInUserDataError,
    loggedInUserDataIsLoading,
    messageThreadData,
    messageThreadError,
    messageThreadIsLoading,
    message_id,
  };
};
