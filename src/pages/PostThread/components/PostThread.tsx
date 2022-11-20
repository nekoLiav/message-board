import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
import { PostThreadContainer } from './style';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';

type AppLoader = {
  currentUser?: UserType;
};

type PostThreadLoader = {
  post: PostType;
  parents?: PostType[];
  replies?: PostType[];
};

export const PostThread = () => {
  const { currentUser } = useRouteLoaderData('app') as AppLoader;
  const { post, parents, replies } = useLoaderData() as PostThreadLoader;

  return (
    <PostThreadContainer>
      {parents &&
        parents.map((post) => (
          <Content key={post.post_id} content={post} chain={true} />
        ))}
      {post && <Content content={post} main={true} />}
      {currentUser && (
        <ContentSubmission post={post} currentUser={currentUser} />
      )}
      {replies &&
        replies.map((post) => <Content key={post.post_id} content={post} />)}
    </PostThreadContainer>
  );
};
