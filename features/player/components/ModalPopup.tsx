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
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { SongCard } from 'components/pages/player';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FC, useEffect, useState, FormEvent } from 'react';
import en from 'translations/en/player';
import vi from 'translations/vi/player';
import { searchSongs } from '../playerThunk';
import { playerActions } from '../playerSlice';

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
    paddingTop: '1rem',
    paddingBottom: '1rem',

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
  resultItem: {
    cursor: 'pointer',
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
  const loading = useAppSelector((state) => state.player.search.loading);
  const result = useAppSelector((state) => state.player.search.data);

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    nextValue: string,
  ) => {
    setType(nextValue);
  };

  function handleQueryChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (query) {
      dispatch(
        searchSongs({
          type,
          query,
        }),
      );
    } else {
      dispatch(playerActions.clearSearchResult());
    }
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
    dispatch(playerActions.clearSearchResult());
  }, [query, dispatch, type]);

  return (
    <Container>
      <Box className={classes.modalRoot}>
        <Box mb={2}>
          <form className={classes.formContainer} onSubmit={onSubmit}>
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
          alignItems="center"
          flexGrow={1}
          className={classes.resultList}
        >
          {loading && <CircularProgress />}
          {result.map((song) => (
            <Box
              mb={1.5}
              key={song.id}
              width="100%"
              className={classes.resultItem}
            >
              <SongCard song={song} />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};
