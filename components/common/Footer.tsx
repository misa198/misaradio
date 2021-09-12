import {
  Box,
  Container,
  FormControl,
  IconButton,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import { GitHub, Link } from '@material-ui/icons';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  footerRoot: {
    color: theme.palette.text.primary,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  footerContainer: {
    marin: 0,
  },
  footerItem: {
    width: 'fit-content',
    margin: 0,
    padding: 0,
  },
  footerLanguage: {
    padding: 0,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  footerLink: {
    color: theme.palette.text.primary,
  },
}));

export const Footer: FC = () => {
  const router = useRouter();
  const { locale } = router;
  const classes = useStyles();
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    setLanguage(locale as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChangeLanguage(event: ChangeEvent<{ value: unknown }>) {
    setLanguage(event.target.value as string);
    router.push(router.pathname, router.asPath, {
      locale: event.target.value as string,
    });
  }

  return (
    <Box width="100%" className={classes.footerRoot} pt={2} m={0}>
      <Container>
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.footerContainer}
          mb={2}
        >
          <Box className={classes.footerItem}>
            <Box p={0}>
              <a
                href="https://github.com/misa198/misa-radio"
                rel="noreferrer"
                target="_blank"
                className={classes.footerLink}
              >
                <IconButton aria-label="volume" size="medium" color="inherit">
                  <GitHub fontSize="medium" />
                </IconButton>
              </a>
              <a
                href="https://misa198.vercel.app/"
                rel="noreferrer"
                target="_blank"
                className={classes.footerLink}
              >
                <IconButton aria-label="volume" size="medium" color="inherit">
                  <Link fontSize="medium" />
                </IconButton>
              </a>
            </Box>
          </Box>
          <Box className={classes.footerItem}>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="language"
                value={language}
                onChange={onChangeLanguage}
              >
                <MenuItem value="vi">Tiếng Việt</MenuItem>
                <MenuItem value="en">English</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
