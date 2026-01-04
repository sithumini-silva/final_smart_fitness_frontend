// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#100101ff', 
        },
        secondary: {
            main: '#3e0b01ff', 
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
