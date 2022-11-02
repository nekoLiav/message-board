import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  query,
  where,
  collectionGroup,
  getDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { formatDistanceToNowStrict } from 'date-fns';
import Header from './Header';
import PostSubmission from './PostSubmission';
import Post from './Post';

const StyledThread = styled.div`
  color: white;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr minmax(min-content, 600px) 1fr;
  height: 100%;
  background: black;
`;

const ThreadMain = styled.div``;

const SourcePost = styled.div`
  border-width: 0 1px 1px 1px;
  border-color: grey;
  border-style: solid;
  min-height: 100px;
`;

const SourcePostInfo = styled.div`
  display: flex;
`;

const SourcePostAuthor = styled.div``;

const SourcePostCreated = styled.div`
  color: grey;
`;

const SourcePostBody = styled.p`
  padding 5px 0;
`;

const Replies = styled.div`
  border-top-width: 1px;
  border-top-color: grey;
  border-top-style: solid;
`;

const ThreadAside = styled.div``;

const Thread = () => {
  const [post, setPost] = useState(null);
  const [postLoaded, setPostLoaded] = useState(false);
  const [replies, setreplies] = useState(null);
  const [repliesLoaded, setRepliesLoaded] = useState(false);
  const params = useParams();

  useEffect(() => {
    const querySourcePost = async () => {
      try {
        const querySnapshot = await getDoc(
          doc(db, 'users', params.user, 'posts', params.post)
        );
        setPost({ ...querySnapshot.data(), postID: querySnapshot.id });
        setPostLoaded(true);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    };
    querySourcePost();
    const queryReplies = async () => {
      try {
        const querySnapshot = await getDocs(
          query(
            collectionGroup(db, 'posts'),
            where('type', '==', 'reply'),
            where('parent', '==', params.post)
          )
        );
        let tempReplies = [];
        querySnapshot.forEach((reply) =>
          tempReplies.push({ ...reply.data(), replyID: reply.id })
        );
        setreplies(tempReplies);
        setRepliesLoaded(true);
      } catch (error) {
        console.log('Something went wrong!', error);
      }
    };
    queryReplies();
  }, [params]);

  return (
    <StyledThread>
      <Header />
      {postLoaded ? (
        <ThreadMain key={post.postID}>
          <SourcePost>
            <SourcePostInfo>
              <SourcePostAuthor>{post.authorName}&nbsp;</SourcePostAuthor>
              <SourcePostCreated>
                &#x2022;&nbsp;{formatDistanceToNowStrict(post.created)}
              </SourcePostCreated>
            </SourcePostInfo>
            <SourcePostBody>{post.body}</SourcePostBody>
          </SourcePost>
          <PostSubmission type={'reply'} post={post} />
          <Replies>
            {repliesLoaded
              ? replies.map((reply) => (
                  <Post key={reply.replyID} post={reply} />
                ))
              : null}
          </Replies>
        </ThreadMain>
      ) : null}
      <ThreadAside />
    </StyledThread>
  );
};

export default Thread;
