import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { wrapper } from 'app/store';
import { DefaultLayout } from 'components/layout';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { FC } from 'react';
import { theme } from 'themes';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
    </Head>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </ThemeProvider>
  </>
);

export default wrapper.withRedux(MyApp);
