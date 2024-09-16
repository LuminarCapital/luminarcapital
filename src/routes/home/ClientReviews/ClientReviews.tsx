import classNames from 'classnames'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { ReactGoogleReview } from 'react-google-reviews'
import ReviewBox from '@/ui/components/ReviewBox/ReviewBox'
import Button from '@/ui/components/Button/Button'
import GoogleIcon from '@/ui/icons/Google'

import '@splidejs/react-splide/css'
import styles from './ClientReviews.module.scss'

interface IClientReviews {
  className?: string
  data: {
    success: boolean
    reviews: ReactGoogleReview[]
  }
}

const ClientReviews = ({ className, data }: IClientReviews) => {
  const options = {
    type: 'loop',
    perMove: 1,
    perPage: 3,
    updateOnMove: true,
    speed: 1000,
    easing: 'ease',
    pagination: false,
    gap: '30rem',
    rewind: true,
    classes: {
      arrows: styles['carousel-arrows'],
      arrow: styles['carousel-arrow'],
      prev: styles['carousel-arrow_prev'],
      next: styles['carousel-arrow_next'],
    },
  }

  return (
    <section className={classNames(styles['section'], 'p-100-0', className)}>
      <div className="content-block">
        <h3 className="h1 section-title text-center">
          Industry Leading Client Success
        </h3>
        {data.success ? (
          <>
            <div className={classNames(styles['carousel'], 'reviews-carousel')}>
              <Splide options={options}>
                {data.reviews.map((review, index) => (
                  <SplideSlide key={`google-review-${index}`}>
                    <ReviewBox data={review} />
                  </SplideSlide>
                ))}
              </Splide>
            </div>
            <div className={styles['carousel-action']}>
              <Button
                href="/"
                icon={GoogleIcon}
                variant="outlined"
                size="xl"
                asDefaultLink
                target="_blank"
              >
                See our reviews on
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}

export default ClientReviews
