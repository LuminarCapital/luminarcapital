import { ReactNode } from 'react'
import classNames from 'classnames'
import MetaLayout from '@/layouts/MetaLayout/MetaLayout'
import styles from './DefaultLayout.module.scss'

interface IDefaultLayout {
  children: ReactNode
}

const DefaultLayout = ({ children }: IDefaultLayout) => {
  return (
    <MetaLayout>
      <main className={styles['main']}>
        {children}
        <div
          className={classNames(
            styles['layout-footer-abstract'],
            'footer-abstract',
          )}
        />
      </main>
    </MetaLayout>
  )
}

export default DefaultLayout
