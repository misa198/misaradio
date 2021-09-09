import { Header } from 'components/common';
import { Footer } from 'components/common/Footer';
import React, { FC } from 'react';

export const DefaultLayout: FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
