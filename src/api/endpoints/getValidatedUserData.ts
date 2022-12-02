import { validateUser } from 'api/auth/validateUser';
import { userDataById } from 'api/queries/user/userDataById';

export const getValidatedUserData = async () => {
  const validatedUser = await validateUser();
  if (validatedUser) {
    const userData = await userDataById(validatedUser.uid);
    return { data: userData };
  } else {
    throw new Error('User data query failed.');
  }
};
