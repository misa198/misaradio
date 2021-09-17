import {
  Box,
  IconButton,
  LinearProgress,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { FastForward, TvOff, VolumeOff, VolumeUp } from '@material-ui/icons';
import { useAppSelector } from 'app/hooks';
import useSocket from 'app/socket';
import { baseUrl } from 'constants/config';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Youtube, { Options } from 'react-youtube';
import en from 'translations/en/player';
import vi from 'translations/vi/player';
import { timeNumberToString } from 'utils/formatTime';
import { YouTubePlayer } from 'youtube-player/dist/types';

const useStyles = makeStyles(() => ({
  videoBox: {
    padding: '0 !important',
  },
  emptyScreen: {
    height: '50vh',
    width: '100%',
  },
  emptyScreenIcon: {
    fontSize: '60px',
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
  forwardButton: {
    marginLeft: '1rem',
    backgroundColor: 'red !important',
  },
  progressBar: {
    position: 'absolute',
    bottom: '2.5px',
    left: 0,
    width: '100%',
  },
}));

const generateYoutubeEmbedOption = (start: number) => {
  const youtubeEmbedPlayerOpts: Options = {
    width: '720',
    height: '405',
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: 1,
      enablejsapi: 1,
      showinfo: 0,
      origin: baseUrl,
      start: Math.round(start / 1000),
    },
  };
  return youtubeEmbedPlayerOpts;
};

const VideoBox: FC = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();
  const socket = useSocket();
  const [hovering, setHovering] = useState(false);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [volume, setVolume] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const playing = useAppSelector((state) => state.player.playing);
  const startAt = useAppSelector((state) => state.player.startAt);
  const [youtubeEmbedPlayerOpts, setYoutubeEmbedPlayerOpts] =
    useState<Options | null>(null);
  const time = useMemo(
    () => timeNumberToString(playing?.duration || 0),
    [playing?.duration],
  );

  useEffect(() => {
    if (player) {
      const intervalId = setInterval(() => {
        setCurrentTime(player.getCurrentTime());
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [player]);

  function switchVolume() {
    if (player) {
      if (player.isMuted()) {
        player.unMute();
        setVolume(true);
      } else {
        player.mute();
        setVolume(false);
      }
    }
  }

  function onHover() {
    setHovering(true);
  }

  function onOut() {
    setHovering(false);
  }

  function onReady(event: { target: YouTubePlayer }) {
    event.target.setVolume(100);
    event.target.playVideo();
    setPlayer(event.target);
  }

  function onPause(event: { target: YouTubePlayer }) {
    event.target.playVideo();
  }

  function onSkip() {
    if (socket) {
      toast.info(t.orderSongPending);
      socket.emit('skip', {
        roomId: router.query.id,
      });
    }
  }

  useEffect(() => {
    if (playing) {
      setYoutubeEmbedPlayerOpts(generateYoutubeEmbedOption(startAt));
    } else {
      setYoutubeEmbedPlayerOpts(null);
      setPlayer(null);
    }
    setCurrentTime(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  return (
    <Box display="flex" flexDirection="column" className={classes.videoBox}>
      {!youtubeEmbedPlayerOpts ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          className={classes.emptyScreen}
        >
          <Box>
            <TvOff className={classes.emptyScreenIcon} />
          </Box>
        </Box>
      ) : (
        <>
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
              {!volume ? (
                <Tooltip title={t.unmute}>
                  <IconButton
                    aria-label="volume"
                    size="medium"
                    className={classes.onButton}
                    onClick={switchVolume}
                  >
                    <VolumeUp fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title={t.mute}>
                  <IconButton
                    aria-label="volume"
                    size="medium"
                    className={classes.offButton}
                    onClick={switchVolume}
                  >
                    <VolumeOff fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title={t.skip}>
                <IconButton
                  aria-label="forward"
                  size="medium"
                  className={classes.forwardButton}
                  onClick={onSkip}
                >
                  <FastForward fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Box>
            {youtubeEmbedPlayerOpts && (
              <Box>
                <Youtube
                  className={classes.youtubeEmbed}
                  videoId={playing?.id}
                  opts={youtubeEmbedPlayerOpts}
                  onReady={onReady}
                  onPause={onPause}
                />
                <LinearProgress
                  className={classes.progressBar}
                  variant="determinate"
                  value={
                    (currentTime / ((playing?.duration || 0) / 1000)) * 100
                  }
                />
              </Box>
            )}
          </Box>

          <Box width="100%" mt={2} textAlign="left">
            <Box>
              <Typography variant="h6">{playing?.title}</Typography>
            </Box>
            <Box mt={1}>
              <Typography variant="body2">
                {t.duration}: {time}
              </Typography>
            </Box>
            <Box mt={1}>
              <Typography variant="body2">
                {t.channel}: {playing?.author}
              </Typography>
            </Box>
            <Box mt={1} mb={1}>
              <Typography variant="body2">
                {t.member} <b>{playing?.orderBy}</b>
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default VideoBox;
