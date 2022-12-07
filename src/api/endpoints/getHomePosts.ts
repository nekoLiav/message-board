import { postsByDatePosted } from 'api/queries/post/postsByDatePosted';

export const getHomePosts = async () => {
  const homePosts = await postsByDatePosted('desc');
  return { data: homePosts };
};
