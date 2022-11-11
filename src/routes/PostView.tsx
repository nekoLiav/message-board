import { useEffect, useState } from 'react';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import PostSubmission from '../components/PostSubmission';
import Post from '../components/Post';
import { getPost } from '../functions/getPostByID';
import { getParents } from '../functions/getParentsByIDs';
import { getReplies } from '../functions/getRepliesByID';
import { Div } from '../styles/Div';
import styled from 'styled-components';
import { isUser } from '../functions/assertUnknowns';

const PostContainer = styled(Div)`
  border-width: 1px 0 0 0;
`;

const PostView = () => {
  const [post, setPost] = useState<PostType | undefined>(undefined);
  const [parents, setParents] = useState<PostType[] | undefined>(undefined);
  const [replies, setReplies] = useState<PostType[] | undefined>(undefined);
  const clientUser = isUser(useRouteLoaderData('app'));
  const params = useParams();

  useEffect(() => {
    (async () => {
      // load main post from url
      if (params.post_id) {
        const postData = await getPost(params.post_id);
        setPost(postData);
        if (postData) {
          // load parent posts through to the "root" post
          // this is the post chain/thread to link together
          const parentData = await getParents(postData.parent_ids);
          setParents(parentData);
          // load replies to main post
          const replyData = await getReplies(postData.post_id);
          setReplies(replyData);
        }
      }
    })();
    // trigger update on url change
  }, [params]);

  return (
    <Div>
      <Div>
        {parents &&
          parents.map((p) => <Post key={p.post_id} post={p} chain={true} />)}
      </Div>
      {post && <Post post={post} main={true} />}
      {post && <PostSubmission post={post} clientUser={clientUser} />}
      <PostContainer>
        {replies && replies.map((r) => <Post key={r.post_id} post={r} />)}
      </PostContainer>
    </Div>
  );
};

export default PostView;
