import { validateUser } from 'api/auth/validateUser';
import { userDataById } from 'api/queries/user/userDataById';
import { messageThreadByMessageId } from 'api/queries/message/messageThreadByMessageId';

export async function messageThreadLoader(message_id: string) {
  const validatedUser = await validateUser();
  if (validatedUser) {
    const currentUser = await userDataById(validatedUser.uid);
    const thread = await messageThreadByMessageId(message_id);
    return { currentUser, message_id, thread };
  }
}
