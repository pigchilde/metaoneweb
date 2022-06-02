import { createTheme } from '@mui/material';
const primaryMain = '#07e3e4';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: primaryMain,
      light: '#009fa0',
    },
    background: {
      paper: 'rgba(40,40,40,1)',
      // paper: "#222b3d",
    },
    error: {
      main: '#ff4343',
    },
  },

  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.MuiButton-root': {
            textTransform: 'none',
          },
        },
      },
      defaultProps: {
        // The props to apply
        disableRipple: false, // No more ripple, on the whole application 💣!
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(0,0,0,0.6)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          '.MuiDialog-paper': {
            backgroundColor: 'rgba(40,40,40,1)',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#FFF',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: '8px',
          '&.MuiPaper-outlined': {
            borderColor: primaryMain,
          },
        },
      },
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});

export default theme;
