import React, { FC } from 'react';
import { Header } from 'components/common';

export const DefaultLayout: FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
