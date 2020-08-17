import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#FFFFFF'
        },
        secondary: {
            main: '#000000'
        }
    },
    typography: {
        color: 'white'
    },
    overrides: {
        MuiButton: {

        },
    }
})
