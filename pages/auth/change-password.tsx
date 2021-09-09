import { AuthContainer } from 'components/pages/auth';
import { ChangePasswordForm } from 'features/auth/components/ChangePasswordForm';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import en from 'translations/en/auth';
import vi from 'translations/vi/auth';

const ChangePassword: NextPage = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;

  return (
    <>
      <Head>
        <title>{t.changePassword}</title>
      </Head>
      <AuthContainer>
        <ChangePasswordForm />
      </AuthContainer>
    </>
  );
};

export default ChangePassword;
