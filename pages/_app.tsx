import {
  createStyles,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core';
import { wrapper } from 'app/store';
import { DefaultLayout } from 'components/layout';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { FC } from 'react';
import { theme } from 'themes';

const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
      },
      body: {
        overflowX: 'hidden',
      },
    },
  }),
);

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  useStyles();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(MyApp);
