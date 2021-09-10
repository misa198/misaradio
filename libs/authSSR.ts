import { getUserByToken } from 'api/authApi';
import { authActions } from 'features/auth/authSlice';
import { User } from 'models/User';
import { GetServerSidePropsResult } from 'next';

export const authSSR = async (
  cookies: { [key: string]: string },
  dispatch: any,
  res: any,
  isPrivate?: boolean,
): Promise<
  GetServerSidePropsResult<{
    user: User | null;
  }>
> => {
  const { token } = cookies;
  if (!token) {
    dispatch(authActions.clear());
    if (isPrivate) {
      return {
        redirect: {
          permanent: false,
          destination: '/auth/login',
        },
      };
    }
    return {
      props: {
        user: null,
      },
    };
  }
  try {
    const user = await getUserByToken(token);

    if (isPrivate && !user) {
      dispatch(authActions.clear());
      return {
        redirect: {
          permanent: false,
          destination: '/auth/login',
        },
      };
    }
    dispatch(authActions.setUser(user.data));
    return {
      props: user.data,
    };
  } catch (e) {
    dispatch(authActions.clear());
    if (isPrivate) {
      return {
        redirect: {
          permanent: false,
          destination: '/auth/login',
        },
      };
    }
    res.setHeader('set-cookie', []);
    return {
      props: {
        user: null,
      },
    };
  }
};
