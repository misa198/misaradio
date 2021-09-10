import { Footer, Header } from 'components/common';
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
