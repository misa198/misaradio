import { Box, makeStyles, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import en from 'translations/en/player';
import vi from 'translations/vi/player';

const useStyles = makeStyles(() => ({
  videoBox: {
    padding: '0 !important',
  },
}));

export const VideoBox: FC = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" className={classes.videoBox}>
      <Box>
        <iframe
          style={{ width: '100%' }}
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="YouTube video player"
          width="640"
          height="400"
          src="https://www.youtube.com/embed/jXpdAJcrTVs?autoplay=1&amp;controls=0&amp;mute=1&amp;start=1&amp;enablejsapi=1&amp;widgetid=1"
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
          <Typography variant="body2">{t.duration}: 04:06 | Youtube</Typography>
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
