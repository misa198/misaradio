import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Banner } from 'components/pages/home';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Misa Radio</title>
      </Head>
      <Banner />
    </>
  );
};

export default Home;
