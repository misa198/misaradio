import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import { Face } from '@material-ui/icons';
import { useAppSelector } from 'app/hooks';
import { RoomUser } from 'models/RoomUser';
import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';
import en from 'translations/en/player';
import vi from 'translations/vi/player';

const useStyles = makeStyles((theme) => ({
  modalRoot: {
    width: '500px',
    backgroundColor: '#212121',
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 3),
    borderRadius: '8px',
    height: '60vh',

    [theme.breakpoints.down('xs')]: {
      width: '350px',
    },
  },
  modalHeader: {
    fontSize: '1.5rem',
    fontWeight: 'bold',

    [theme.breakpoints.down('xs')]: {
      fonSize: '1rem !important',
    },
  },
  peopleList: {
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
  peopleItem: {
    padding: '0.5rem 1rem',
  },
  peopleItemText: {
    marginLeft: '0.75rem',
  },
}));

export const PeopleModalPopup: FC = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();
  const users = useAppSelector((state) => state.player.room?.users);
  const uniqueUser = useMemo(() => {
    if (!users) return [];
    const uniques: RoomUser[] = [];
    users.forEach((user) => {
      if (!uniques.find((u) => u.userId === user.userId)) {
        uniques.push(user);
      }
    });
    return uniques;
  }, [users]);

  return (
    <Container>
      <Box className={classes.modalRoot}>
        <Box mb={2} textAlign="center">
          <Typography variant="h5" className={classes.modalHeader}>
            {t.people}
          </Typography>
        </Box>
        <Box
          width="100%"
          flexGrow={1}
          pt={2}
          pb={2}
          className={classes.peopleList}
        >
          {uniqueUser.map((u) => (
            <Box display="flex" className={classes.peopleItem}>
              <Face />
              <Typography className={classes.peopleItemText}>
                {u.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};
