import { CssBaseline } from '@material-ui/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
    </Head>

    <CssBaseline />
    <Component {...pageProps} />
  </>
);

export default MyApp;
