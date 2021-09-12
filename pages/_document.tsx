import { ServerStyleSheets } from '@material-ui/core/styles';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { Children } from 'react';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="copyright" content="Misa Radio" />
          <meta name="theme-color" content="#000" />
          <meta property="og:type" content="website" />
          <meta
            property="fb:app_id"
            content={process.env.NEXT_PUBLIC_FB_APP_ID}
          />
          {/* Global site tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-${process.env.NEXT_PUBLIC_GG_AN_ID}`}
          />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag("js", new Date());
              gtag('config', 'G-${process.env.NEXT_PUBLIC_GG_AN_ID}');`,
            }}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {process.env.NODE_ENV === 'production' && (
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
                if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
                  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {};
                }
              `,
              }}
            />
          )}
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const materialUiSheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        materialUiSheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...Children.toArray(initialProps.styles),
      ...Children.toArray(materialUiSheets.getStyleElement()),
    ],
  };
};
