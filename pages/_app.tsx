import {
  createStyles,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core';
import { useInitSocket } from 'app/socket';
import { wrapper } from 'app/store';
import { DefaultLayout } from 'components/layout';
import { ConnectedRouter } from 'connected-next-router';
import { AppProps } from 'next/app';
import Head from 'next/head';
import NextNprogress from 'nextjs-progressbar';
import React, { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      a: {
        textDecoration: 'none',
      },
    },
  }),
);

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  useStyles();
  useInitSocket();

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DefaultLayout>
          <ConnectedRouter>
            <Component {...pageProps} />
          </ConnectedRouter>
        </DefaultLayout>
      </ThemeProvider>
      <ToastContainer />
      <NextNprogress
        color="#e53935"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow
        options={{
          showSpinner: false,
        }}
      />
    </>
  );
};

export default wrapper.withRedux(MyApp);
