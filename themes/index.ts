import { red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#000',
      paper: 'rgba(0, 0, 0, 0.7)',
    },
    primary: {
      main: red[600],
    },
  },
  typography: {
    allVariants: {
      color: '#fff',
    },
  },
});
