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
import en from 'translations/en/footer';
import vi from 'translations/vi/footer';

const useStyles = makeStyles((theme) => ({
  footerRoot: {
    // backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    position: 'fixed',
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
}));

export const Footer: FC = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    setLanguage(locale as string);
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
              {/* <Image src={logo} alt="misa-radio-logo" width={120} height={50} /> */}
              <IconButton aria-label="volume" size="medium" color="inherit">
                <GitHub fontSize="medium" />
              </IconButton>
              <IconButton aria-label="volume" size="medium" color="inherit">
                <Link fontSize="medium" />
              </IconButton>
            </Box>
          </Box>
          <Box className={classes.footerItem}>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                labelId="language"
                value={language}
                onChange={onChangeLanguage}
              >
                <MenuItem value={'vi'}>Tiếng Việt</MenuItem>
                <MenuItem value={'en'}>English</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
