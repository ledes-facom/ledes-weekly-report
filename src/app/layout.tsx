import SupabaseProvider from './supabase-provider'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { ReactNode } from 'react'

const source = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700', '800', '900'],
})

export const metadata = {
  title: 'Ledes Weekly Report',
  description: 'Generated by create next app',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/images/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/images/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/images/apple-touch-icon.png',
    },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <body
        className={
          '-z-20 flex min-h-screen flex-col items-center bg-neutral-200 ' +
          source.className
        }
      >
        <SupabaseProvider session={null}>
          {/* <SupabaseListener serverAccessToken={session?.access_token} /> */}
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}
