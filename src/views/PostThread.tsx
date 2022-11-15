import { useEffect, useState } from 'react';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import PostSubmission from '../components/PostSubmission/PostSubmission';
import Post from '../components/Post/Post';
import { isUser } from '../functions/assertUnknowns';
import getPostThread from '../functions/getPostThread';
import { assertDefined } from '../functions/assertDefined';

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

  if (!isLoading) {
    return (
      <div>
        {parents &&
          parents.map((p) => <Post key={p.post_id} post={p} chain={true} />)}
        {post && <Post post={post} main={true} />}
        {post && <PostSubmission post={post} clientUser={clientUser} />}
        {replies && replies.map((r) => <Post key={r.post_id} post={r} />)}
      </div>
    );
  }
  return null;
};

export default PostThread;
