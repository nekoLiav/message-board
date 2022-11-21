import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from 'App';

const Home = lazy(() => import('pages/Home'));
const UserProfile = lazy(() => import('pages/UserProfile'));
const Messages = lazy(() => import('pages/Messages'));
const MessageThread = lazy(() => import('pages/MessageThread'));
const PostThread = lazy(() => import('pages/PostThread'));

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from 'config';

import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore';
import {
  userConverter,
  postConverter,
  messageConverter,
} from 'functions/firestoreDataCoversion';
import { db } from 'config';

async function getCurrentUser() {
  function getValidatedUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe();
          resolve(user);
        },
        reject // pass up any errors attaching the listener
      );
    });
  }

  const user = (await getValidatedUser()) as User;

  if (!user) {
    console.log('User not logged in.');
    signInWithEmailAndPassword(auth, 'definitelyrealemail@lol.net', '123456')
      .then(() => getCurrentUser())
      .catch((error) => console.log('Sign in failed!', error));
  } else {
    const userRef = doc(db, 'users', user.uid).withConverter(userConverter);
    const userSnap = await getDoc(userRef);
    const currentUser = userSnap.data();
    return currentUser;
  }
}

async function getHomePosts() {
  const homePostRefs = query(
    collection(db, 'posts').withConverter(postConverter),
    where('is_reply', '==', false)
  );
  const homePostSnap = await getDocs(homePostRefs);
  const homePosts = homePostSnap.docs.map((doc) => doc.data());
  return homePosts;
}

async function homeLoader() {
  const currentUser = await getCurrentUser();
  const homePosts = await getHomePosts();
  return { currentUser, homePosts };
}

async function getUserByHandle(handle?: string) {
  const userRef = query(
    collection(db, 'users').withConverter(userConverter),
    where('handle', '==', handle)
  );
  const userSnap = await getDocs(userRef);
  const user = userSnap.docs[0]?.data();
  return user;
}

async function getPostsByUserId(id?: string) {
  const userPostRefs = query(
    collection(db, 'posts').withConverter(postConverter),
    where('user_id', '==', id),
    where('is_reply', '==', false)
  );
  const userPostSnap = await getDocs(userPostRefs);
  const userPosts = userPostSnap.docs.map((doc) => doc.data());
  return userPosts;
}

async function userProfileLoader(handle: string) {
  const currentUser = await getCurrentUser();
  const user = await getUserByHandle(handle);
  const userPosts = await getPostsByUserId(user?.id);
  return { currentUser, user, userPosts };
}

async function getMessagesByRecipient(recipient?: string) {
  const messageRefs = query(
    collection(db, 'messages').withConverter(messageConverter),
    where('recipient', '==', recipient),
    where('is_reply', '==', false)
  );
  const messageSnap = await getDocs(messageRefs);
  const messages = messageSnap.docs.map((doc) => doc.data());
  return messages;
}

async function messagesLoader() {
  const currentUser = await getCurrentUser();
  const messages = await getMessagesByRecipient(currentUser?.id);
  return { currentUser, messages };
}

async function getPostById(post_id: string) {
  const postRef = doc(db, 'posts', post_id).withConverter(postConverter);
  const postSnap = await getDoc(postRef);
  const post = postSnap.data();
  return post;
}

async function getParentPostsByIds(parent_ids?: string[]) {
  const parents: PostType[] = [];
  parent_ids?.forEach(async (parent_id) => {
    const parentRef = doc(db, 'posts', parent_id).withConverter(postConverter);
    const parentSnap = await getDoc(parentRef);
    const parentData = parentSnap.data();
    if (parentData) {
      parents.push(parentData);
    }
  });
  return parents;
}

async function getReplyPostsByPostId(post_id?: string) {
  const replyRefs = query(
    collection(db, 'posts').withConverter(postConverter),
    where('direct_parent', '==', post_id)
  );
  const replySnap = await getDocs(replyRefs);
  const replies = replySnap.docs.map((doc) => doc.data());
  return replies;
}

async function postThreadLoader(post_id: string) {
  const currentUser = await getCurrentUser();
  const post = await getPostById(post_id);
  const parents = await getParentPostsByIds(post?.parent_ids);
  const replies = await getReplyPostsByPostId(post?.post_id);
  return { currentUser, post, parents, replies };
}

async function getMessageThreadByMessageId(message_id: string) {
  const threadRef = query(
    collection(db, 'messages').withConverter(messageConverter),
    where('parent_id', '==', message_id)
  );
  const threadSnap = await getDocs(threadRef);
  const thread = threadSnap.docs.map((doc) => doc.data());
  return thread;
}

async function messageThreadLoader(message_id: string) {
  const currentUser = await getCurrentUser();
  const thread = await getMessageThreadByMessageId(message_id);
  return { currentUser, message_id, thread };
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    id: 'app',
    children: [
      {
        element: <Home />,
        index: true,
        loader: () => homeLoader(),
      },
      {
        path: '/home',
        element: <Home />,
        loader: () => homeLoader(),
      },
      {
        path: '/:handle',
        element: <UserProfile />,
        loader: ({ params }) => {
          if (params.handle) {
            return userProfileLoader(params.handle);
          }
        },
      },
      {
        path: '/messages',
        element: <Messages />,
        loader: () => messagesLoader(),
      },
      {
        path: '/messages/:message_id',
        element: <MessageThread />,
        loader: ({ params }) => {
          if (params.message_id) {
            return messageThreadLoader(params.message_id);
          }
        },
      },
      {
        path: '/:handle/post/:post_id',
        element: <PostThread />,
        loader: ({ params }) => {
          if (params.post_id) {
            return postThreadLoader(params.post_id);
          }
        },
      },
    ],
  },
]);
