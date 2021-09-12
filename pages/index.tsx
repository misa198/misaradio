import { Banner } from 'components/pages/home';
import { authSSR } from 'libs/authSSR';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { wrapper } from 'app/store';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Misa Radio</title>
        <meta name="title" content="Misa Radio" />
        <meta property="og:title" content="Misa Radio" />
        <meta property="twitter:title" content="Misa Radio" />
      </Head>
      <Banner />
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const res = await authSSR(context.req.cookies, store.dispatch, context.res);
    return res;
  });

export default Home;
