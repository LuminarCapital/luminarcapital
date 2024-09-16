import { ReactNode } from 'react'
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
        <div className={styles['layout-header-abstract']} />
        {children}
        <div className={styles['layout-footer-abstract']} />
      </main>
      <Footer />
    </MetaLayout>
  )
}

export default DefaultLayout
