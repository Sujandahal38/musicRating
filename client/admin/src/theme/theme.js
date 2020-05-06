
import { createMuiTheme } from '@material-ui/core';


const theme = createMuiTheme({
 palette: {
  primary: {
   main: '#a00fc7',
   light: '#9750a8',
   dark: '#3f206c',
  },
  secondary: {
   main: '#1c2e94',
   light: '#344ab5',
   dark: '#071c80',
  },
 },
 typography : {
  fontFamily: [
   '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
  ].join(','),
 },
})

export default theme;