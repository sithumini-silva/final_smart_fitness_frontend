// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0077b6', // blue
        },
        secondary: {
            main: '#00b4d8', // teal-ish
        },
        background: {
            default: '#f5f7fb',
        },
    },
    shape: {
        borderRadius: 12,
    },
});

export default theme;
