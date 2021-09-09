import {
  Box,
  Container,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import logo from 'public/logo.svg';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import en from 'translations/en/footer';
import vi from 'translations/vi/footer';

const useStyles = makeStyles((theme) => ({
  footerRoot: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  footerContainer: {
    marin: 0,
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
    <Box width="100%" className={classes.footerRoot} pt={5} pb={1} m={0}>
      <Container>
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          className={classes.footerContainer}
          mb={4}
        >
          <Box p={0}>
            <Box p={0}>
              <Image src={logo} alt="misa-radio-logo" width={120} height={50} />
            </Box>
            <Box maxWidth={200} p={0}>
              <Typography variant="body2">{t.footerDescription}</Typography>
            </Box>
          </Box>
          <Box p={0}>
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
