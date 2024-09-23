import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/hooks'
import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/ui/components/Button/Button'
import NavLink from '@/ui/components/NavLink/NavLink'
import Burger from '@/ui/components/Burger/Burger'
import { openModal } from '@/store/slices/modalSlice'
import styles from './Header.module.scss'

interface IHeader {
  className?: string
}

const nav = [
  {
    label: 'Financing Options',
    href: '/financing-options',
  },
  {
    label: 'Learning Center',
    href: '/learning-center',
  },
  {
    label: 'Partners',
    href: '/partners',
  },
  {
    label: 'Why Luminar',
    href: '/why-luminar',
  },
  {
    label: 'Contact Us',
    href: '/contact',
  },
]

const Header = ({ className }: IHeader) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isScrolling, setIsScrolling] = useState<boolean>(false)

  const onScroll = useCallback(() => {
    const { scrollY } = window
    setIsScrolling(scrollY > 0)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll, { passive: true })

      return () => {
        window.removeEventListener('scroll', onScroll)
      }
    }
  }, [onScroll])

  return (
    <header
      className={classNames(
        styles['header'],
        isScrolling ? styles['scrolling'] : null,
        className,
      )}
    >
      <div className="content-block">
        <div className={styles['header-panel']}>
          <Link href="/" className={styles['header-panel-logo']}>
            <Image src="/color_logo.svg" alt="Luminar Capital" fill />
          </Link>
          <nav
            className={classNames(
              styles['header-panel-nav'],
              isMenuOpen ? styles['active'] : null,
            )}
          >
            <ul className={styles['header-navigation']}>
              {nav.map((link, index) => (
                <li key={`nav-${index}`}>
                  <NavLink
                    href={link.href}
                    isActive={router.pathname == link.href}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className={styles['header-actions']}>
              <Button
                variant="outlined"
                className={styles['header-actions-item']}
                onClick={() =>
                  dispatch(openModal({ modal: 'partner', size: 'lg' }))
                }
              >
                Become a Partner
              </Button>
              <Button
                className={styles['header-actions-item']}
                onClick={() =>
                  dispatch(openModal({ modal: 'financing', size: 'xl' }))
                }
              >
                Apply for Financing
              </Button>
            </div>
          </nav>
          <div className={styles['header-burger']}>
            <Burger
              isActive={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
