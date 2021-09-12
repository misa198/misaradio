import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import { VolumeOff, VolumeUp } from '@material-ui/icons';
import { baseUrl } from 'constants/config';
import { useRouter } from 'next/router';
import React, { FC, useState, useEffect } from 'react';
import Youtube, { Options } from 'react-youtube';
import { YouTubePlayer } from 'youtube-player';
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
  youtubeEmbed: {
    width: '100%',
    pointerEvents: 'none',

    '& iframe': {
      width: '100%',
    },
  },
  onButton: {
    backgroundColor: 'red !important',
  },
  offButton: {
    backgroundColor: '#f2f2f2 !important',
    color: '#313131',
  },
}));

const youtubeEmbedPlayerOpts: Options = {
  width: '640',
  height: '400',
  playerVars: {
    autoplay: 1,
    controls: 0,
    mute: 0,
    start: 1,
    enablejsapi: 1,
    showinfo: 0,
    origin: baseUrl,
  },
};

export const VideoBox: FC = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();
  const [hovering, setHovering] = useState(false);
  const [volume, setVolume] = useState(true);
  const [player, setPlayer] = useState<YouTubePlayer>(null);

  function switchVolume() {
    setVolume(!volume);
  }

  function onHover() {
    setHovering(true);
  }

  function onOut() {
    setHovering(false);
  }

  function onReady(event: { target: YouTubePlayer }) {
    setPlayer(event.target);
  }

  useEffect(() => {
    if (player) {
      player.setVolume(volume ? 100 : 0);
    }
  }, [volume, player]);

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
            opacity: hovering ? 1 : 0,
          }}
        >
          {volume ? (
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
        <Youtube
          className={classes.youtubeEmbed}
          videoId="jXpdAJcrTVs"
          opts={youtubeEmbedPlayerOpts}
          onReady={onReady}
        />
        {/* <iframe
          title="SoundCloud"
          width="100%"
          height="450"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/556627674&color=%23e53935&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
        /> */}
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
