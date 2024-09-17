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
              <Button
                variant="outlined"
                className={styles['header-actions-item']}
              >
                Become a Partner
              </Button>
              <Button className={styles['header-actions-item']}>
                Apply for Financing
              </Button>
            </div>
          </nav>
          <div className={styles['header-burger']}></div>
        </div>
      </div>
    </header>
  )
}

// <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M4 5L20 5M4 12L20 12M4 19L20 19" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>

// <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M19.0002 4.99994L5.00024 18.9999M5.00024 4.99994L19.0002 18.9999" stroke="#141516" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>

export default Header
