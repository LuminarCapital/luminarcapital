import '@/styles/index.scss'
import type { AppProps } from 'next/app'
import DefaultLayout from '@/layouts/DefaultLayout/DefaultLayout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  )
}
