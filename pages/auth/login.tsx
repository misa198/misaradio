import { AuthContainer } from 'components/pages/auth';
import { LoginForm } from 'features/auth/components/LoginForm';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import en from 'translations/en/auth';
import vi from 'translations/vi/auth';

const AuthPageMiddleware = dynamic(
  () => import('middlewares/AuthPageMiddleware'),
);

const Login: NextPage = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;

  return (
    <>
      <Head>
        <title>{t.login}</title>
      </Head>
      <AuthContainer>
        <AuthPageMiddleware>
          <LoginForm />
        </AuthPageMiddleware>
      </AuthContainer>
    </>
  );
};

export default Login;
