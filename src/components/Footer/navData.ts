import { FC, SVGProps } from 'react'
import GoogleMinifyIcon from '@/ui/icons/GoogleMinify'
import LinkedinIcon from '@/ui/icons/Linkedin'
import TrustPilotIcon from '@/ui/icons/TrustPilot'
import FacebookIcon from '@/ui/icons/Facebook'
import InstagramIcon from '@/ui/icons/Instagram'
import TwitterIcon from '@/ui/icons/Twitter'
import { IModalPayload } from '@/types'

interface INavData {
  socials: {
    title: string
    icon: FC<SVGProps<SVGSVGElement>>
    href: string
  }[]
  main: {
    title: string
    nav: { label: string; href?: string; modal?: IModalPayload }[]
  }[]
  secondary: { title: string; href: string }[]
}

export const navData: INavData = {
  socials: [
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
  ],
  main: [
    {
      title: 'Financing Options',
      nav: [
        {
          label: 'Revenue Based Financing',
          href: '/financing-options?origin=0&scroll=true',
        },
        {
          label: 'Early Repayment Discounts',
          href: '/financing-options?origin=1&scroll=true',
        },
        {
          label: 'Revolving Working Capital',
          href: '/financing-options?origin=2&scroll=true',
        },
      ],
    },
    {
      title: 'Discover',
      nav: [
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
      ],
    },
    {
      title: 'Resources',
      nav: [
        {
          label: 'Contact Us',
          href: '/contact',
        },
        {
          label: 'Become a Partner',
          modal: { modal: 'partner', size: 'lg' },
        },
        {
          label: 'Apply for Financing',
          modal: { modal: 'financing', size: 'xl' },
        },
      ],
    },
  ],
  secondary: [
    {
      title: 'Privacy Policy',
      href: '/privacy-policy',
    },
    {
      title: 'Terms and Service',
      href: '/terms-of-service',
    },
  ],
}
