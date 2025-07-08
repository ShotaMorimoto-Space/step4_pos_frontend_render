// pages/_app.tsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import theme from '../theme';
import React from 'react';
import { Oswald } from 'next/font/google';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // 必要な太さを選択
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
