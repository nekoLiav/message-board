import { validateUser } from 'api/auth/validateUser';
import { userDataById } from 'api/queries/user/userDataById';
import { postsByDatePosted } from 'api/queries/post/postsByDatePosted';

export async function homeLoader() {
  const validatedUser = await validateUser();
  if (validatedUser) {
    const currentUser = await userDataById(validatedUser.uid);
    const homePosts = await postsByDatePosted('desc');
    return { currentUser, homePosts };
  }
}
