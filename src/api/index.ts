import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getValidatedUserData } from './endpoints/getValidatedUserData';
import { getHomePosts } from './endpoints/getHomePosts';
import { getPostThread } from './endpoints/getPostThread';
import { getMessageThread } from './endpoints/getMessageThread';
import { getMessages } from './endpoints/getMessages';

type PostThreadData = {
  post: PostType | undefined;
  parents: PostType[];
  replies: PostType[];
};

type MessageThreadData = {
  thread: MessageType[];
};

export const api = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    validatedUserData: builder.query<UserType | undefined, void>({
      queryFn: () => getValidatedUserData(),
    }),
    homePosts: builder.query<PostType[], void>({
      queryFn: () => getHomePosts(),
    }),
    postThread: builder.query<PostThreadData, string>({
      queryFn: (post_id) => getPostThread(post_id),
    }),
    messageThread: builder.query<MessageThreadData, string>({
      queryFn: (message_id) => getMessageThread(message_id),
    }),
    messages: builder.query<MessageType[], void>({
      queryFn: () => getMessages(),
    }),
  }),
});

export default api;

export const {
  useValidatedUserDataQuery,
  useHomePostsQuery,
  usePostThreadQuery,
  useMessageThreadQuery,
  useMessagesQuery,
} = api;
