import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getValidatedUserData } from './endpoints/getValidatedUserData';

export const api = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    validatedUserData: builder.query<UserType | undefined, void>({
      queryFn: () => getValidatedUserData(),
    }),
  }),
});

export default api;

export const { useValidatedUserDataQuery } = api;
