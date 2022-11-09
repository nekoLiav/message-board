import { useEffect, useState } from 'react';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import PostSubmission from '../components/PostSubmission/PostSubmission';
import Post from '../components/Post/Post';
import { InferProps } from 'prop-types';
import { getPost } from '../components/PostView/getPost';
import { getParents } from '../components/PostView/getParents';
import { getReplies } from '../components/PostView/getReplies';
import { UserType } from '../Types/PropTypes';

const StyledPostView = styled.div``;

const PostViewMain = styled.div`
  background: black;
  border-width: 0 1px 0 1px;
  border-style: solid;
  border-color: grey;
`;

const Parents = styled.div``;

const Replies = styled.div`
  border-top-width: 1px;
  border-top-color: grey;
  border-top-style: solid;
`;

type DataTypes = {
  user: InferProps<typeof UserType>;
};

const PostView = () => {
  const [post, setPost] = useState(null);
  const [postLoaded, setPostLoaded] = useState(false);
  const [parents, setParents] = useState([]);
  const [parentsLoaded, setParentsLoaded] = useState(false);
  const [replies, setReplies] = useState([]);
  const [repliesLoaded, setRepliesLoaded] = useState(false);
  const userData: DataTypes['user'] = useRouteLoaderData('app');
  const params = useParams();

  useEffect(() => {
    (async () => {
      // load main post from url
      const postData = await getPost(params.post_id);
      setPost(postData);
      setPostLoaded(true);
      // load parent posts through to the "root" post
      // this is the post chain/thread to link together
      const parentData = await getParents(postData.parent_ids);
      setParents(parentData);
      setParentsLoaded(true);
      // load replies to main post
      const replyData = await getReplies(
        postData.post_id,
        postData.direct_parent
      );
      setReplies(replyData);
      setRepliesLoaded(true);
    })();
    // trigger update on url change
  }, [params]);

  return (
    <StyledPostView>
      <PostViewMain>
        <Parents>
          {parentsLoaded && parents.length
            ? parents.map((p) => <Post key={p.post_id} post={p} chain={true} />)
            : null}
        </Parents>
        {postLoaded && <Post post={post} main={true} />}
        {postLoaded && <PostSubmission post={post} user={userData} />}
        <Replies>
          {repliesLoaded && replies.length
            ? replies.map((r) => <Post key={r.post_id} post={r} />)
            : null}
        </Replies>
      </PostViewMain>
    </StyledPostView>
  );
};

export default PostView;
