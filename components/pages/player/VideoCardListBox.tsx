import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { Add, MusicNote } from '@material-ui/icons';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import en from 'translations/en/player';
import vi from 'translations/vi/player';
import { useAppSelector } from 'app/hooks';
import { SongCard } from '.';

const useStyles = makeStyles(() => ({
  videoListBox: {
    padding: '0 !important',
    maxHeight: '65vh',
  },
  itemsWrapper: {
    overflowX: 'hidden',
    overflowY: 'auto',

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

interface PropTypes {
  handleOpen: () => void;
}

export const VideoCardListBox: FC<PropTypes> = ({ handleOpen }) => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();
  const queue = useAppSelector((state) => state.player.room?.queue);

  return (
    <Box display="flex" flexDirection="column" className={classes.videoListBox}>
      <Box
        flexGrow={1}
        width="100%"
        pb={1}
        pt={1}
        className={classes.itemsWrapper}
      >
        {!queue || queue?.length === 0 ? (
          <Box width="100%" pt={2}>
            <MusicNote />
            <Typography variant="body1">{t.addMessage}</Typography>
          </Box>
        ) : (
          <>
            {queue.map((song) => (
              <>
                <SongCard song={song} inQueue key={song.uniqueId} />
              </>
            ))}
          </>
        )}
      </Box>
      <Box pt={1}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleOpen}
        >
          <Add />
        </Button>
      </Box>
    </Box>
  );
};
