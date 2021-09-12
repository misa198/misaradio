import { Seo } from 'components/common';
import { AuthContainer } from 'components/pages/auth';
import { RegisterForm } from 'features/auth/components/RegisterForm';
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
        <Seo title={t.register} />
      </Head>
      <AuthContainer>
        <AuthPageMiddleware>
          <RegisterForm />
        </AuthPageMiddleware>
      </AuthContainer>
    </>
  );
};

export default Login;
