import { validateUser } from 'api/auth/validateUser';
import { messagesByUserId } from 'api/queries/message/messagesByUserId';

export const getMessages = async () => {
  const validatedUser = await validateUser();
  if (validatedUser) {
    const messages = await messagesByUserId(validatedUser.uid);
    return { data: messages };
  } else {
    return { data: undefined };
  }
};
