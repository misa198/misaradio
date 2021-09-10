import { AppBar, Box, Button, Container, makeStyles } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import logo from 'public/logo.svg';
import React, { FC } from 'react';
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
  const isLoggedIn = useAppSelector((state) => state.auth.login.loggedIn);

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
          pt={2}
          pb={1.3}
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
          {!isLoggedIn && (
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
          )}
        </Box>
      </Container>
    </AppBar>
  );
};
