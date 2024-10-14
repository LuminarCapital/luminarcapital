import '@/styles/index.scss'
import 'slick-carousel/slick/slick.css'
import 'react-loading-skeleton/dist/skeleton.css'
import type { AppProps } from 'next/app'
import DefaultLayout from '@/layouts/DefaultLayout/DefaultLayout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  )
}
