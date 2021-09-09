import { AppBar, Box, Button, Container } from '@material-ui/core';
import Image from 'next/image';
import logo from 'public/logo.svg';
import React, { FC } from 'react';
import { useRouter } from 'next/router';
import vi from 'translations/vi/header';
import en from 'translations/en/header';

export const Header: FC = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container>
        <Box
          component="div"
          width="100%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          py={0.5}
          p={0}
        >
          <Box component="div" p={0}>
            <Image src={logo} alt="misa-radio-logo" width={120} height={50} />
          </Box>
          <Box component="div" p={0}>
            <Button variant="contained" color="primary">
              {t.login}
            </Button>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};
