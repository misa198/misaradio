import { AuthContainer } from 'components/pages/auth';
import { ForgotPasswordForm } from 'features/auth/components/ForgotPasswordForm';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import en from 'translations/en/auth';
import vi from 'translations/vi/auth';

const ForgotPassword: NextPage = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;

  return (
    <>
      <Head>
        <title>{t.forgotPassword}</title>
      </Head>
      <AuthContainer>
        <ForgotPasswordForm />
      </AuthContainer>
    </>
  );
};

export default ForgotPassword;
