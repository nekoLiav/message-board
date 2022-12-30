import { userDataById } from 'api/queries/user/userDataById';

export const getLoggedInUserData = async (userId: string | undefined) => {
  if (userId) {
    const userData = await userDataById(userId);
    return { data: userData };
  } else {
    return { data: undefined };
  }
};
