import { useEffect, useState } from 'react';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import ContentSubmission from '../../components/ContentSubmission/ContentSubmission';
import Content from '../../components/Content/Content';
import { isUser } from '../../functions/assertUnknowns';
import getPostThread from '../../functions/getPostThread';
import { assertDefined } from '../../functions/assertDefined';
import { PostThreadContainer } from './style';

const PostThread = () => {
  const [post, setPost] = useState<PostType>();
  const [parents, setParents] = useState<PostType[]>();
  const [replies, setReplies] = useState<PostType[]>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const clientUser = isUser(useRouteLoaderData('app'));
  const params = useParams();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      assertDefined(params.post_id);
      const threadData: PostThread | undefined = await getPostThread(
        params.post_id
      );
      assertDefined(threadData, 'threadData in PostThread.tsx');
      const { postData, parentData, replyData } = threadData;
      setPost(postData);
      setParents(parentData);
      setReplies(replyData);
      setIsLoading(false);
    })();
  }, [params]);

  if (!isLoading && post) {
    return (
      <PostThreadContainer>
        {parents &&
          parents.map((p) => (
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
