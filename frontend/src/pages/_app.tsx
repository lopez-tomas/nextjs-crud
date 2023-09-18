import AppContext from '@/contexts/AppContext'
import useInitialState from '@/hooks/useInitialState'

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'

import Head from 'next/head'
import '@/styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const initialState = useInitialState()
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <AppContext.Provider value={initialState}>
      <>
        <Head>
          <title>admin | by Tomás</title>
          <meta name='description' content='admin - Tomás López' />
          {/* <link rel='icon' href='' /> */}
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </>
    </AppContext.Provider>
  )
}
