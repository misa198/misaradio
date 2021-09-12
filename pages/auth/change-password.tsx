import { AuthContainer } from 'components/pages/auth';
import { ChangePasswordForm } from 'features/auth/components/ChangePasswordForm';
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

const ChangePassword: NextPage = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const title = t.changePassword;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta property="og:title" content={title} />
        <meta property="twitter:title" content={title} />
      </Head>
      <AuthContainer>
        <AuthPageMiddleware>
          <ChangePasswordForm />
        </AuthPageMiddleware>
      </AuthContainer>
    </>
  );
};

export default ChangePassword;
