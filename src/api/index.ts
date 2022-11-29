import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { validateUser } from './auth/validateUser';
import { userDataById } from './queries/user/userDataById';

export const api = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getUserDataById: builder.query<UserType | undefined, void>({
      queryFn: async () => {
        const validatedUser = await validateUser();
        if (validatedUser) {
          const userData = await userDataById(validatedUser.uid);
          return { data: userData };
        } else {
          throw new Error('User data query failed.');
        }
      },
    }),
  }),
});

export default api;

export const { useGetUserDataByIdQuery } = api;
