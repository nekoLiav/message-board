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
import PostSubmission from './Post/PostSubmission';
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
      // load main post
      const postRef = doc(db, 'posts', params.post);
      const postSnap = await getDoc(postRef);
      setPost(postSnap.data());
      setPostLoaded(true);
      // load parent posts up to and including the root post
      const parentRefs = postSnap.data().parent_ids;
      let tempParents = [];
      parentRefs.forEach(async (parent) => {
        const parentRef = doc(db, 'posts', parent);
        const parentSnap = await getDoc(parentRef);
        tempParents.push(parentSnap.data());
      });
      setParents(tempParents);
      setParentsLoaded(true);
      // load replies to main post
      const repliesRef = query(
        collection(db, 'posts'),
        where('direct_parent', '==', params.post)
      );
      const repliesSnap = await getDocs(repliesRef);
      let tempReplies = [];
      repliesSnap.forEach((reply) => {
        if (reply.data().direct_parent !== postSnap.direct_parent) {
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
        {parentsLoaded ? (
          <Parents key={parents.length}>
            {parents.map((parent) => (
              <Post key={parent.post_id} post={parent} chained={true} />
            ))}
          </Parents>
        ) : null}
        {postLoaded ? <Post post={post} chained={false} /> : null}
        {postLoaded ? <PostSubmission user={props.user} post={post} /> : null}
        {repliesLoaded ? (
          <Replies>
            {replies.map((reply) => (
              <Post key={reply.post_id} post={reply} />
            ))}
          </Replies>
        ) : null}
      </PostViewMain>
      <PostViewAside />
    </StyledPostView>
  );
};

PostView.propTypes = {
  user: PropTypes.object,
};

export default PostView;
