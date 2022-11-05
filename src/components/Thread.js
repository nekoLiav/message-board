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
import Post from './Post';
import PropTypes from 'prop-types';

const StyledThread = styled.div`
  color: white;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr minmax(min-content, 600px) 1fr;
  height: 100%;
  width: 100%;
  background: black;
`;

const ThreadMain = styled.div`
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

const ThreadAside = styled.div`
  background: black;
`;

const Thread = (props) => {
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
      if (parentRefs.length > 0) {
        let tempParents = [];
        parentRefs.forEach(async (parent) => {
          const parentRef = doc(db, 'posts', parent);
          const parentSnap = await getDoc(parentRef);
          tempParents.push(parentSnap.data());
        });
        setParents(tempParents);
        setParentsLoaded(true);
      }
      // load replies to main post
      const repliesRef = query(
        collection(db, 'posts'),
        where('parent_ids', 'array-contains', params.post)
      );
      const repliesSnap = await getDocs(repliesRef);
      let tempReplies = [];
      repliesSnap.forEach((reply) => tempReplies.push(reply.data()));
      setReplies(tempReplies);
      setRepliesLoaded(true);
    })();
    // trigger update on url change
  }, [params]);

  return (
    <StyledThread>
      <Header />
      <ThreadMain>
        {parentsLoaded ? (
          <Parents>
            {parents.map((parent) => (
              <Post key={parent.post_id} post={parent} threadView={true} />
            ))}
          </Parents>
        ) : null}
        {postLoaded ? (
          <Post key={post.post_id} post={post} threadView={parentsLoaded} />
        ) : null}
        {postLoaded ? <PostSubmission user={props.user} post={post} /> : null}
        {repliesLoaded ? (
          <Replies>
            {replies.map((reply) => (
              <Post key={reply.post_id} post={reply} />
            ))}
          </Replies>
        ) : null}
      </ThreadMain>
      <ThreadAside />
    </StyledThread>
  );
};

Thread.propTypes = {
  user: PropTypes.object,
};

export default Thread;
