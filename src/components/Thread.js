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

const ThreadView = styled.div``;

const Replies = styled.div`
  border-top-width: 1px;
  border-top-color: grey;
  border-top-style: solid;
`;

const ThreadAside = styled.div`
  background: black;
`;

const Thread = (props) => {
  const [replyTarget, setReplyTarget] = useState(null);
  const [sourcePost, setSourcePost] = useState(null);
  const [sourcePostLoaded, setSourcePostLoaded] = useState(false);
  const [thread, setThread] = useState([]);
  const [threadLoaded, setThreadLoaded] = useState(false);
  const [replies, setReplies] = useState(null);
  const [repliesLoaded, setRepliesLoaded] = useState(false);
  const params = useParams();

  useEffect(() => {
    setSourcePostLoaded(false);
    setThreadLoaded(false);
    setRepliesLoaded(false);
    const getThread = async () => {
      try {
        const postRef = doc(db, 'posts', params.post);
        const postSnap = await getDoc(postRef);
        if (postSnap.data().thread_id) {
          const sourceRef = doc(db, 'posts', postSnap.data().source_post_id);
          const sourceSnap = await getDoc(sourceRef);
          setSourcePost(sourceSnap.data());
          setReplyTarget(postSnap.data());
          setSourcePostLoaded(true);
          const q = query(
            collection(db, 'posts'),
            where('thread_id', '==', postSnap.data().thread_id)
          );
          const querySnapshot = await getDocs(q);
          let tempThread = [];
          querySnapshot.forEach((doc) => tempThread.push(doc.data()));
          setThread(tempThread);
          setThreadLoaded(true);
        } else {
          setSourcePost(postSnap.data());
          setReplyTarget(postSnap.data());
          setSourcePostLoaded(true);
          setThreadLoaded(true);
        }
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    };
    getThread();
    const getReplies = async () => {
      try {
        const q = query(
          collection(db, 'posts'),
          where(`source_post_id`, '==', params.post)
        );
        const querySnapShot = await getDocs(q);
        let tempReplies = [];
        querySnapShot.forEach((doc) => tempReplies.push(doc.data()));
        setReplies(tempReplies);
        setRepliesLoaded(true);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    };
    getReplies();
  }, [params]);

  return (
    <StyledThread>
      <Header />
      <ThreadMain>
        {sourcePostLoaded && threadLoaded ? (
          <Post post={sourcePost} threadView={thread.length > 0} />
        ) : null}
        {threadLoaded && thread.length > 0 ? (
          <ThreadView>
            {thread.map((post, index) => (
              <Post
                key={post.post_id}
                post={post}
                threadView={index !== thread.length - 1}
              />
            ))}
          </ThreadView>
        ) : null}
        {sourcePostLoaded ? (
          <PostSubmission post={replyTarget} user={props.user} type={'reply'} />
        ) : null}
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
