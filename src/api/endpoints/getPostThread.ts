import { postById } from 'api/queries/post/postById';
import { postParents } from 'api/queries/post/postParents';
import { postReplies } from 'api/queries/post/postReplies';

export const getPostThread = async (post_id: string) => {
  const post = await postById(post_id);
  const parents = await postParents(post?.parent_ids);
  const replies = await postReplies(post?.post_id);
  return { data: { post, parents, replies } };
};
