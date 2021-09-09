import { AuthContainer } from 'components/pages/auth';
import { LoginForm } from 'features/auth/components/LoginForm';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import en from 'translations/en/auth';
import vi from 'translations/vi/auth';

const Login: NextPage = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;

  return (
    <>
      <Head>
        <title>{t.login}</title>
      </Head>
      <AuthContainer>
        <LoginForm />
      </AuthContainer>
    </>
  );
};

export default Login;
