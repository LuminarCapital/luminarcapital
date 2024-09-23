import { IOption } from '@/types'

export const QUERY_PARAMETERS = {
  LIMIT: 9,
  LATEST: 6,
}

export const STATUS = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
}

export const WORDPRESS_API_PATHS = {
  graphql: 'graphql',
  rest: 'wp-json/api/v1',
}

export const AMOUNT_OPTIONS: IOption[] = [
  { label: '< $20,000', value: '< $20,000' },
  { label: '$20,000 - $50,000', value: '$20,000 - $50,000' },
  { label: '$50,000 - $75,000', value: '$50,000 - $75,000' },
  { label: '$75,000 - $125,000', value: '$75,000 - $125,000' },
  { label: '$125,000 - $200,000', value: '$125,000 - $200,000' },
  { label: '> $200,000', value: '> $200,000' },
]

export const cardsCarouselSettings = {
  adaptiveHeight: true,
  variableWidth: true,
  dots: true,
  arrows: false,
  centerMode: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 1000,
}
