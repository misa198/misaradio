import { AppBar, Box, Button, Container, makeStyles } from '@material-ui/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import logo from 'public/logo.svg';
import React, { FC } from 'react';
import Link from 'next/link';
import en from 'translations/en/header';
import vi from 'translations/vi/header';

const useStyles = makeStyles(() => ({
  button: {
    width: 'fit-content',
    whiteSpace: 'nowrap',
  },
}));

export const Header: FC = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();

  return (
    <AppBar position="absolute" color="transparent" elevation={0}>
      <Container>
        <Box
          component="div"
          width="100%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          py={1.3}
          p={0}
        >
          <Box component="div" p={0}>
            <Link href="/">
              <a>
                <Image
                  src={logo}
                  alt="misa-radio-logo"
                  width={120}
                  height={50}
                />
              </a>
            </Link>
          </Box>
          <Box component="div" p={0}>
            <Link href="/auth/login">
              <a>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  {t.login}
                </Button>
              </a>
            </Link>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};
