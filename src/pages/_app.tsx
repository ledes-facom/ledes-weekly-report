import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { DataProvider } from '../lib/DataContext';
import { UserProvider } from '@supabase/auth-helpers-react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <DataProvider>
        <NextNProgress />
        <Component {...pageProps} />
      </DataProvider>
    </UserProvider>
  );
}

export default MyApp;
