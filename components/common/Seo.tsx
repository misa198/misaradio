import { baseUrl, seoImage } from 'constants/config';
import { useRouter } from 'next/router';
import { FC } from 'react';
import en from 'translations/en/app';
import vi from 'translations/vi/app';

interface PropTypes {
  title: string;
}

export const Seo: FC<PropTypes> = ({ title }) => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;

  return (
    <>
      <>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta property="og:title" content={title} />
        <meta property="twitter:title" content={title} />
      </>

      <>
        <meta name="description" content={t.description} />
        <meta property="og:description" content={t.description} />
        <meta property="twitter:description" content={t.description} />
      </>

      <>
        <meta property="og:url" content={baseUrl} />
        <meta property="twitter:url" content={baseUrl} />
      </>

      <>
        <meta property="og:image" content={seoImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={seoImage} />
      </>
    </>
  );
};
