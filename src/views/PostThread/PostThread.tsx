import ContentSubmission from '@/components/ContentSubmission/ContentSubmission';
import Content from '@/components/Content/Content';
import { PostThreadContainer } from './style';
import usePostThread from '@/hooks/usePostThread';

const PostThread = () => {
  const { post, parents, replies, isLoading, clientUser } = usePostThread();

  if (!isLoading && post) {
    return (
      <PostThreadContainer key={post.post_id}>
        {parents.map((p) => (
          <Content key={p.post_id} content={p} chain={true} />
        ))}
        <Content content={post} main={true} />
        <ContentSubmission post={post} clientUser={clientUser} />
        {replies && replies.map((r) => <Content key={r.post_id} content={r} />)}
      </PostThreadContainer>
    );
  }
  return null;
};

export default PostThread;
