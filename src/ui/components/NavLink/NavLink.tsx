import { ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'
import classNames from 'classnames'
import styles from './NavLink.module.scss'

interface INavLink extends LinkProps {
  className?: string
  children?: string | ReactNode
}

const NavLink = ({ className, children, ...props }: INavLink) => {
  return (
    <Link {...props} className={classNames(styles['navLink'], className)}>
      {children}
    </Link>
  )
}

export default NavLink
