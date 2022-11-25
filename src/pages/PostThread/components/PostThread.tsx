import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
import { useLoaderData } from 'react-router-dom';

type PostThreadLoader = {
  currentUser: UserType;
  post: PostType;
  parents?: PostType[];
  replies?: PostType[];
};

export const PostThread = () => {
  const { currentUser, post, parents, replies } =
    useLoaderData() as PostThreadLoader;

  return (
    <div>
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
    </div>
  );
};
