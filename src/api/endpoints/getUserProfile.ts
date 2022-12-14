import { validateUser } from 'api/auth/validateUser';
import { postsByUserId } from 'api/queries/post/postsByUserId';
import { userByHandle } from 'api/queries/user/userByHandle';
import { userDataById } from 'api/queries/user/userDataById';

export async function getUserProfile(handle: string) {
  const validatedUser = await validateUser();
  if (validatedUser) {
    const currentUser = await userDataById(validatedUser.uid);
    const user = await userByHandle(handle);
    const userPosts = await postsByUserId(user?.id);
    return { data: { currentUser, user, userPosts } };
  } else {
    throw new Error('User Profile data query failed.');
  }
}
