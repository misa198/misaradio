import {
  Box,
  CircularProgress,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useAppDispatch } from 'app/hooks';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import en from 'translations/en/player';
import vi from 'translations/vi/player';
import { searchSongs } from '../playerThunk';

const useStyles = makeStyles((theme) => ({
  modalRoot: {
    width: '720px',
    backgroundColor: '#212121',
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 3),
    borderRadius: '8px',

    [theme.breakpoints.down('xs')]: {
      width: '360px',
      padding: theme.spacing(2),
    },
  },
  modalHeader: {
    fontSize: '1.5rem',
    fontWeight: 'bold',

    [theme.breakpoints.down('xs')]: {
      fonSize: '1rem !important',
    },
  },
  formContainer: {
    width: '100%',
  },
  resultList: {
    height: '50vh',
    overflowY: 'auto',
    overflowX: 'hidden',

    '&::-webkit-scrollbar': {
      width: '3px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px #202020',
      webkitBoxShadow: 'inset 0 0 6px #202020',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#555',
      outline: 'none',
      borderRadius: '10px',
    },
  },
}));

export const ModalPopup: FC = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();
  const [type, setType] = useState('youtube');
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    nextValue: string,
  ) => {
    setType(nextValue);
  };

  function handleQueryChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  useEffect((): any => {
    if (query) {
      const timeOutId = setTimeout(() => {
        dispatch(
          searchSongs({
            type,
            query,
          }),
        );
      }, 500);
      return () => clearTimeout(timeOutId);
    }
  }, [query, dispatch, type]);

  return (
    <Container>
      <Box className={classes.modalRoot}>
        <Box mb={2}>
          <form className={classes.formContainer}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography variant="h5" className={classes.modalHeader}>
                {t.search}
              </Typography>
              <ToggleButtonGroup
                value={type}
                exclusive
                onChange={handleChange}
                size="small"
              >
                <ToggleButton value="youtube" aria-label="youtube">
                  Youtube
                </ToggleButton>
                <ToggleButton value="soundcloud" aria-label="soundcloud">
                  SoundCloud
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box>
              <TextField
                size="medium"
                margin="normal"
                variant="outlined"
                fullWidth
                placeholder={`${t.searchSomething} ...`}
                onChange={handleQueryChange}
              />
            </Box>
          </form>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          flexGrow={1}
          className={classes.resultList}
        >
          <CircularProgress />
          {/* <Box mb={1}>
            <SongCard />
          </Box>
          <Box mb={1}>
            <SongCard />
          </Box> */}
        </Box>
      </Box>
    </Container>
  );
};
