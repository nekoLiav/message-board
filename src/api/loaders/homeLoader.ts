import { postsByDatePosted } from 'api/queries/post/postsByDatePosted';

export async function homeLoader() {
  const homePosts = await postsByDatePosted('desc');
  return { homePosts };
}
