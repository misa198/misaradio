import { Box, Grid } from '@material-ui/core';
import React, { FC } from 'react';

export const SongCard: FC = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}></Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Box>
  );
};
