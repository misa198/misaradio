import { Box } from '@material-ui/core';
import { Footer, Header } from 'components/common';
import React, { FC } from 'react';

export const DefaultLayout: FC = ({ children }) => {
  return (
    <Box position="relative" width="100vw" minHeight="100vh">
      <Header />
      {children}
      <Footer />
    </Box>
  );
};
