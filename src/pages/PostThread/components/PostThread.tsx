import { ContentSubmission } from 'features/ContentSubmission';
import { Content } from 'features/Content';
import { PostThreadContainer } from './style';
import useGetPostThread from '../hooks/useGetPostThread';

export const PostThread = () => {
  const { post, parents, replies, isLoading, clientUser } = useGetPostThread();

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