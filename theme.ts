// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // 好みに応じて色を変更（青系）
    },
    secondary: {
      main: '#f50057', // optional
    },
  },
  shape: {
    borderRadius: 16, // 全体的に丸みを強調
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Noto Sans JP"',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

export default theme;
