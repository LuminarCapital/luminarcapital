import { ReactNode } from 'react'
import classNames from 'classnames'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import MetaLayout from '@/layouts/MetaLayout/MetaLayout'
import styles from './DefaultLayout.module.scss'

interface IDefaultLayout {
  children: ReactNode
}

const DefaultLayout = ({ children }: IDefaultLayout) => {
  return (
    <MetaLayout>
      <Header />
      <main className={styles['main']}>
        {children}
        <div
          className={classNames(
            styles['layout-footer-abstract'],
            'footer-abstract',
          )}
        />
      </main>
      <Footer />
    </MetaLayout>
  )
}

export default DefaultLayout
