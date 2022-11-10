import { useEffect, useState } from 'react';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import PostSubmission from '../components/PostSubmission';
import Post from '../components/Post';
import { getPost } from '../functions/getPostByID';
import { getParents } from '../functions/getParentsByIDs';
import { getReplies } from '../functions/getRepliesByID';
import { Div } from '../styles/Div';
import styled from 'styled-components';

const PostContainer = styled(Div)`
  border-width: 1px 0 0 0;
`;

const PostView = () => {
  const [post, setPost] = useState<PostType>();
  const [postLoaded, setPostLoaded] = useState(false);
  const [parents, setParents] = useState<PostType[]>([]);
  const [parentsLoaded, setParentsLoaded] = useState(false);
  const [replies, setReplies] = useState<PostType[]>([]);
  const [repliesLoaded, setRepliesLoaded] = useState(false);
  const clientUser: UserType = useRouteLoaderData('app');
  const params = useParams();

  useEffect(() => {
    (async () => {
      // load main post from url
      if (params.post_id) {
        const postData = await getPost(params.post_id);
        setPost(postData);
        setPostLoaded(true);
        // load parent posts through to the "root" post
        // this is the post chain/thread to link together
        if (postData) {
          const parentData = await getParents(postData.parent_ids);
          setParents(parentData);
          setParentsLoaded(true);
          // load replies to main post
          const replyData = await getReplies(postData.post_id);
          setReplies(replyData);
          setRepliesLoaded(true);
        }
      }
    })();
    // trigger update on url change
  }, [params]);

  return (
    <Div>
      <Div>
        {parentsLoaded && parents.length
          ? parents.map((p) => <Post key={p.post_id} post={p} chain={true} />)
          : null}
      </Div>
      {postLoaded && post ? <Post post={post} main={true} /> : null}
      {postLoaded && <PostSubmission post={post} clientUser={clientUser} />}
      <PostContainer>
        {repliesLoaded && replies.length
          ? replies.map((r) => <Post key={r.post_id} post={r} />)
          : null}
      </PostContainer>
    </Div>
  );
};

export default PostView;
