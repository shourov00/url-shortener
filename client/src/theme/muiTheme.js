import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#1652F0',
            main: '#0052FF',
        },
        secondary: {
            main: "#FF7588"
        }
    },
    typography: {
        fontFamily: "Poppins, sans-serif !important;",
    }
});

export default theme;
