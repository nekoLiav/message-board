import { validateUser } from 'api/auth/validateUser';
import { userDataById } from 'api/queries/user/userDataById';
import { messagesByUserId } from 'api/queries/message/messagesByUserId';

export async function messagesLoader() {
  const validatedUser = await validateUser();
  if (validatedUser) {
    const currentUser = await userDataById(validatedUser.uid);
    const messages = await messagesByUserId(validatedUser.uid);
    return { currentUser, messages };
  }
}
