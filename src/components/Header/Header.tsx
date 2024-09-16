import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/ui/components/Button/Button'
import NavLink from '@/ui/components/NavLink/NavLink'
import styles from './Header.module.scss'

interface IHeader {
  className?: string
}

const nav = [
  {
    label: 'Financing Options',
    href: '/',
  },
  {
    label: 'Learning Center',
    href: '/',
  },
  {
    label: 'Partners',
    href: '/',
  },
  {
    label: 'Why Luminar',
    href: '/',
  },
  {
    label: 'Contact Us',
    href: '/',
  },
]

const Header = ({ className }: IHeader) => {
  return (
    <header className={classNames(styles['header'], className)}>
      <div className="content-block">
        <div className={styles['header-panel']}>
          <Link href="/" className={styles['header-panel-logo']}>
            <Image src="/color_logo.svg" alt="Luminar Capital" fill />
          </Link>
          <nav className={styles['header-panel-nav']}>
            <ul className={styles['header-navigation']}>
              {nav.map((n, index) => (
                <li key={`nav-${index}`}>
                  <NavLink href={n.href}>{n.label}</NavLink>
                </li>
              ))}
            </ul>
            <div className={styles['header-actions']}>
              <Button variant="outlined">Become a Partner</Button>
              <Button>Apply for Financing</Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
