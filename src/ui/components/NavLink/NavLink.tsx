import { ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'
import classNames from 'classnames'
import ArrowRightIcon from '@/ui/icons/ArrowRight'
import styles from './NavLink.module.scss'

interface INavLink extends LinkProps {
  className?: string
  children?: string | ReactNode
}

const NavLink = ({ className, children, ...props }: INavLink) => {
  return (
    <Link {...props} className={classNames(styles['navLink'], className)}>
      {children}
      <ArrowRightIcon className={styles['navLink-icon']} />
    </Link>
  )
}

export default NavLink
