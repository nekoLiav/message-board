/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import Header from './Header';
import PostSubmission from './PostSubmission';
import Post from './Post/Post';
import PropTypes from 'prop-types';

const StyledPostView = styled.div`
  color: white;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr minmax(min-content, 600px) 1fr;
  height: 100%;
  width: 100%;
  background: black;
`;

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

const PostViewAside = styled.div`
  background: black;
`;

const PostView = (props) => {
  const [post, setPost] = useState(null);
  const [postLoaded, setPostLoaded] = useState(false);
  const [parents, setParents] = useState([]);
  const [parentsLoaded, setParentsLoaded] = useState(false);
  const [replies, setReplies] = useState([]);
  const [repliesLoaded, setRepliesLoaded] = useState(false);
  const params = useParams();

  useEffect(() => {
    (async () => {
      // load main post from url
      const postRef = doc(db, 'posts', params.post);
      const postSnap = await getDoc(postRef);
      const postData = postSnap.data();
      setPost(postData);
      setPostLoaded(true);
      // load parent posts through to the "root" post
      // this is the post chain/thread to link together
      const parentRefs = postData.parent_ids;
      let tempParents = [];
      parentRefs.forEach(async (parent) => {
        const parentRef = doc(db, 'posts', parent);
        const parentSnaps = await getDoc(parentRef);
        tempParents.push(parentSnaps.data());
      });
      setParents(tempParents);
      setParentsLoaded(true);
      // load replies to main post
      const replyRefs = query(
        collection(db, 'posts'),
        where('direct_parent', '==', postData.post_id)
      );
      const replySnaps = await getDocs(replyRefs);
      let tempReplies = [];
      replySnaps.forEach((reply) => {
        if (reply.data().direct_parent !== postData.direct_parent) {
          tempReplies.push(reply.data());
        }
      });
      setReplies(tempReplies);
      setRepliesLoaded(true);
    })();
    // trigger update on url change
  }, [params]);

  return (
    <StyledPostView>
      <Header />
      <PostViewMain>
        <Parents>
          {parentsLoaded && parents.length
            ? parents.map((parent) => (
                <Post key={parent.post_id} post={parent} chained={true} />
              ))
            : null}
        </Parents>
        {postLoaded && <Post post={post} />}
        {postLoaded && (
          <PostSubmission
            post={post}
            id={props.user.id}
            avatar={props.user.avatar}
          />
        )}
        <Replies>
          {repliesLoaded && replies.length
            ? replies.map((reply) => <Post key={reply.post_id} post={reply} />)
            : null}
        </Replies>
      </PostViewMain>
      <PostViewAside />
    </StyledPostView>
  );
};

PostView.propTypes = {
  user: PropTypes.object,
};

export default PostView;
