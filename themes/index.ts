import { grey, red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: grey[900],
    },
    primary: {
      main: red[600],
    },
  },
});
