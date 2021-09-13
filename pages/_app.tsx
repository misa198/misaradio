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
import { baseUrl, seoImage } from 'constants/config';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NextNprogress from 'nextjs-progressbar';
import React, { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from 'themes';
import en from 'translations/en/app';
import vi from 'translations/vi/app';

const DisableContextMenu = dynamic(
  () => import('components/common/DisableContextMenu'),
  {
    ssr: false,
  },
);

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

      '.Toastify__toast': {
        background: '#313131 !important',
        color: '#fff !important',
      },

      '.Toastify__close-button': {
        color: '#fff !important',
        opacity: '1',
      },
    },
  }),
);

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  useStyles();
  useInitSocket();
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5"
        />
        <meta name="description" content={t.description} />
        <meta property="og:description" content={t.description} />
        <meta property="twitter:description" content={t.description} />

        <meta property="og:url" content={baseUrl} />
        <meta property="twitter:url" content={baseUrl} />

        <meta property="og:image" content={seoImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={seoImage} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DefaultLayout>
          <DisableContextMenu />
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
