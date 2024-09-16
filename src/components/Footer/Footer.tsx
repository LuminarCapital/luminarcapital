import { createElement, FC, SVGProps } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import GoogleMinifyIcon from '@/ui/icons/GoogleMinify'
import LinkedinIcon from '@/ui/icons/Linkedin'
import styles from './Footer.module.scss'
import TrustPilotIcon from '@/ui/icons/TrustPilot'
import FacebookIcon from '@/ui/icons/Facebook'
import InstagramIcon from '@/ui/icons/Instagram'
import TwitterIcon from '@/ui/icons/Twitter'

interface IFooter {
  className?: string
}

const socials: {
  title: string
  icon: FC<SVGProps<SVGSVGElement>>
  href: string
}[] = [
  {
    title: 'Google',
    icon: GoogleMinifyIcon,
    href: '/',
  },
  {
    title: 'LinkedIn',
    icon: LinkedinIcon,
    href: '/',
  },
  {
    title: 'TrustPilot',
    icon: TrustPilotIcon,
    href: '/',
  },
  {
    title: 'Facebook',
    icon: FacebookIcon,
    href: '/',
  },
  {
    title: 'Instagram',
    icon: InstagramIcon,
    href: '/',
  },
  {
    title: 'Twitter',
    icon: TwitterIcon,
    href: '/',
  },
]

const navMain: { title: string; nav: { label: string; href: string }[] }[] = [
  {
    title: 'Financing Options',
    nav: [
      {
        label: 'Revenue Based Financing',
        href: '/',
      },
      {
        label: 'Early Repayment Discounts',
        href: '/',
      },
      {
        label: 'Revolving Working Capital',
        href: '/',
      },
    ],
  },
  {
    title: 'Discover',
    nav: [
      {
        label: 'Why Luminar',
        href: '/',
      },
      {
        label: 'Partners',
        href: '/',
      },
      {
        label: 'Learning Center',
        href: '/',
      },
    ],
  },
  {
    title: 'Resources',
    nav: [
      {
        label: 'Contact Us',
        href: '/',
      },
      {
        label: 'Become a Partner',
        href: '/',
      },
      {
        label: 'Apply for Financing',
        href: '/',
      },
    ],
  },
]

const navSecondary: { title: string; href: string }[] = [
  {
    title: 'Privacy Policy',
    href: '/',
  },
  {
    title: 'Terms and Service',
    href: '/',
  },
]

const Footer = ({ className }: IFooter) => {
  return (
    <footer className={classNames(styles['footer'], className)}>
      <div className="content-block">
        <div className="row">
          <div className="col-md-5 col-gutter-lr">
            <div className={styles['footer-body']}>
              <Link href="/" className={styles['footer-logo']}>
                <Image src="/color_logo.svg" alt="Luminar Capital" fill />
              </Link>
              <p className={styles['footer-body-description']}>
                <strong>When you succeed, we succeed.</strong> At Luminar
                Capital, we are focused on delivering custom financing solutions
                with exceptional customer service. Our relationships with our
                customers are intimate, not robotic. We view you as a partner
                and not a transaction.
              </p>
              <div className={styles['footer-social']}>
                {socials.map((social, index) => (
                  <a
                    key={`social-icon-${index}`}
                    href={social.href}
                    target="_blank"
                    title={social.title}
                    className={styles['footer-social-icon']}
                  >
                    {createElement(social.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-7 col-gutter-lr">
            <div className={styles['footer-nav']}>
              {navMain.map((navGroup, index) => (
                <div
                  key={`footer-nav-group-${index}`}
                  className={styles['footer-nav-item']}
                >
                  <h4 className={styles['footer-nav-title']}>
                    {navGroup.title}
                  </h4>
                  <ul className={styles['footer-nav-group']}>
                    {navGroup.nav.map((link, i) => (
                      <li key={`footer-link-${i}`}>
                        <Link
                          href={link.href}
                          title={link.label}
                          className={styles['footer-link']}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles['footer-copyright']}>
          <p className={styles['footer-copyright-item']}>
            Copyright &copy; 2024 Luminar Capital LLC. All rights reserved.
          </p>
          <div className={styles['footer-secondaryNav']}>
            {navSecondary.map((link, index) => (
              <Link
                key={`footer-link-secondary-${index}`}
                href={link.href}
                className={styles['footer-link-secondary']}
                title={link.title}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
