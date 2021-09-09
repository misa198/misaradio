import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import { VolumeUp, VolumeOff } from '@material-ui/icons';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import en from 'translations/en/player';
import vi from 'translations/vi/player';

const useStyles = makeStyles(() => ({
  videoBox: {
    padding: '0 !important',
  },
  iframeBox: {
    position: 'relative',
  },
  iframeOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    zIndex: 2,
    transition: 'all 200ms',
  },
  onButton: {
    backgroundColor: 'red !important',
  },
  offButton: {
    backgroundColor: '#f2f2f2 !important',
    color: '#313131',
  },
}));

export const VideoBox: FC = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();
  const [volumeOn, setVolumeOn] = useState(true);
  const [hovering, setHovering] = useState(false);

  const switchVolume = () => {
    setVolumeOn(!volumeOn);
  };

  const onHover = () => {
    setHovering(true);
  };

  const onOut = () => {
    setHovering(false);
  };

  return (
    <Box display="flex" flexDirection="column" className={classes.videoBox}>
      <Box
        className={classes.iframeBox}
        onMouseOver={onHover}
        onMouseLeave={onOut}
      >
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          className={classes.iframeOverlay}
          style={{
            // visibility: hovering ? 'visible' : 'hidden',
            opacity: hovering ? 1 : 0,
          }}
        >
          {volumeOn ? (
            <IconButton
              aria-label="volume"
              size="medium"
              className={classes.onButton}
              onClick={switchVolume}
            >
              <VolumeUp fontSize="inherit" />
            </IconButton>
          ) : (
            <IconButton
              aria-label="volume"
              size="medium"
              className={classes.offButton}
              onClick={switchVolume}
            >
              <VolumeOff fontSize="inherit" />
            </IconButton>
          )}
        </Box>
        <iframe
          style={{ width: '100%', pointerEvents: 'none' }}
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="YouTube video player"
          width="640"
          height="400"
          src="https://www.youtube.com/embed/jXpdAJcrTVs?autoplay=1&amp;controls=0&amp;mute=0&amp;start=1&amp;enablejsapi=1&amp;widgetid=1"
        />
      </Box>

      <Box width="100%" mt={2} textAlign="left">
        <Box>
          <Typography variant="h6">
            Chuyện “Sao kê”: Nghệ sĩ cần minh bạch trong hoạt động từ thiện |
            VTV24
          </Typography>
        </Box>
        <Box mt={1}>
          <Typography variant="body2">{t.duration}: 04:06</Typography>
        </Box>
        <Box mt={1}>
          <Typography variant="body2">{t.channel}: VTV24 | Youtube</Typography>
        </Box>
        <Box mt={1} mb={1}>
          <Typography variant="body2">
            {t.member} <b>Misa198</b>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
