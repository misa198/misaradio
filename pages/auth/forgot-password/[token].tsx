import { Seo } from 'components/common';
import { AuthContainer } from 'components/pages/auth';
import { ResetPasswordForm } from 'features/auth/components/ResetPasswordForm';
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

const ForgotPassword: NextPage = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;

  return (
    <>
      <Head>
        <Seo title={t.resetPassword} />
      </Head>
      <AuthContainer>
        <AuthPageMiddleware>
          <ResetPasswordForm />
        </AuthPageMiddleware>
      </AuthContainer>
    </>
  );
};

export default ForgotPassword;
