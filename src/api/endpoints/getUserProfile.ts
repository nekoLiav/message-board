import { postsByUserId } from 'api/queries/post/postsByUserId';
import { userByHandle } from 'api/queries/user/userByHandle';

export async function getUserProfile(handle: string | undefined) {
  if (handle) {
    const user = await userByHandle(handle);
    const userPosts = await postsByUserId(user?.id);
    return { data: { user, userPosts } };
  } else {
    return { data: undefined };
  }
}
