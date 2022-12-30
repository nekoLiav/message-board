import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getLoggedInUserData } from './endpoints/getLoggedInUserData';
import { getHomePosts } from './endpoints/getHomePosts';
import { getPostThread } from './endpoints/getPostThread';
import { getMessageThread } from './endpoints/getMessageThread';
import { getMessages } from './endpoints/getMessages';
import { getUserProfile } from './endpoints/getUserProfile';

type PostThreadData = {
  post: PostType | undefined;
  parents: PostType[];
  replies: PostType[];
};

type UserProfileData = {
  user: UserType | undefined;
  userPosts: PostType[];
};

export const api = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    loggedInUserData: builder.query<UserType | undefined, string | undefined>({
      queryFn: (userId) => getLoggedInUserData(userId),
    }),
    homePosts: builder.query<PostType[], void>({
      queryFn: () => getHomePosts(),
    }),
    postThread: builder.query<PostThreadData, string>({
      queryFn: (post_id) => getPostThread(post_id),
    }),
    messageThread: builder.query<MessageType[], string>({
      queryFn: (message_id) => getMessageThread(message_id),
    }),
    messages: builder.query<MessageType[] | undefined, void>({
      queryFn: () => getMessages(),
    }),
    userProfile: builder.query<UserProfileData | undefined, string | undefined>(
      {
        queryFn: (user_id) => getUserProfile(user_id),
      }
    ),
  }),
});

export default api;

export const {
  useLoggedInUserDataQuery,
  useHomePostsQuery,
  usePostThreadQuery,
  useMessageThreadQuery,
  useMessagesQuery,
  useUserProfileQuery,
} = api;
