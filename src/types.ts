import { FC, SVGProps } from 'react'

export interface IFinancingOptionCard {
  className?: string
  title: string
  description: string
  href?: string
  icon?: FC<SVGProps<SVGSVGElement>>
}

export interface IGoogleReview {
  author_name: string
  author_url: string
  language: string
  original_language: string
  profile_photo_url: string
  rating: number
  relative_time_description: string
  text: string
  time: number
  translated: boolean
}

export interface ISlickArrow {
  className?: string
  onClick?: () => void
  style?: {
    [key: string]: string
  }
}
