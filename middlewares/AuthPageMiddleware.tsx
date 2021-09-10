// Return to home page if user logged in and has a token
import { useAppDispatch } from 'app/hooks';
import { push } from 'connected-next-router';
import Cookies from 'js-cookie';
import { FC, useRef } from 'react';

const AuthPageMiddleware: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const token = useRef(Cookies.get('token'));
  if (token.current) dispatch(push('/'));

  if (!token.current) return <>{children}</>;
  return null;
};

export default AuthPageMiddleware;
