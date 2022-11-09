import { useEffect, useState } from 'react';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import PostSubmission from '../components/PostSubmission';
import Post from '../components/Post';
import { InferProps } from 'prop-types';
import { getPost } from '../functions/getPostByID';
import { getParents } from '../functions/getParentsByIDs';
import { getReplies } from '../functions/getRepliesByID';
import { UserType } from '../types/PropTypes';
import { Div } from '../styles/Div';
import styled from 'styled-components';

const PostContainer = styled(Div)`
  border-width: 1px 0 0 0;
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
      const replyData = await getReplies(postData.post_id);
      setReplies(replyData);
      setRepliesLoaded(true);
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
      {postLoaded && <Post post={post} main={true} />}
      {postLoaded && <PostSubmission post={post} user={userData} />}
      <PostContainer>
        {repliesLoaded && replies.length
          ? replies.map((r) => <Post key={r.post_id} post={r} />)
          : null}
      </PostContainer>
    </Div>
  );
};

export default PostView;
