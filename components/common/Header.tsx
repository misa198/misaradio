import {
  AppBar,
  Box,
  Button,
  Container,
  makeStyles,
  Menu,
  MenuItem,
  Popover,
} from '@material-ui/core';
import { AccountCircle, ExitToApp } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import Cookies from 'js-cookie';
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
  accountButton: {
    textTransform: 'none',
  },
  menu: {
    marginTop: '3rem',
  },
  menuIcon: {
    marginLeft: '0.5rem',
  },
}));

export const Header: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { locale } = router;
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();
  const isLoggedIn = useAppSelector((state) => state.auth.login.loggedIn);
  const user = useAppSelector((state) => state.auth.login.user);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleLogout() {
    Cookies.remove('token');
    dispatch(authActions.clear());
    router.push('/');
  }

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
          <Box component="div" p={0} width="fit-content">
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
          {!isLoggedIn ? (
            <Box component="div" p={0} width="fit-content">
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
          ) : (
            <Box component="div" p={0} width="fit-content">
              <Button
                variant="outlined"
                color="inherit"
                className={classes.accountButton}
                endIcon={<AccountCircle />}
                size="medium"
                onClick={handleClick}
              >
                {user?.name}
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  className={classes.menu}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      handleLogout();
                    }}
                  >
                    Logout <ExitToApp className={classes.menuIcon} />
                  </MenuItem>
                </Menu>
              </Popover>
            </Box>
          )}
        </Box>
      </Container>
    </AppBar>
  );
};
