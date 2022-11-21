import { validateUser } from 'api/auth/validateUser';
import { postById } from 'api/queries/post/postById';
import { postParents } from 'api/queries/post/postParents';
import { postReplies } from 'api/queries/post/postReplies';
import { userDataById } from 'api/queries/user/userDataById';

export async function postThreadLoader(post_id: string) {
  const validatedUser = await validateUser();
  if (validatedUser) {
    const currentUser = await userDataById(validatedUser.uid);
    const post = await postById(post_id);
    const parents = await postParents(post?.parent_ids);
    const replies = await postReplies(post?.post_id);
    return { currentUser, post, parents, replies };
  }
}
