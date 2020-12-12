import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333366',
      light: '#6B6BB3',
    },
    secondary: {
      main: '#FFDE4D',
    },
  },
  overrides: {
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});
