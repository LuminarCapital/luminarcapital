import classNames from 'classnames'
import { ReactGoogleReview } from 'react-google-reviews'
import Image from 'next/image'
import styles from './ReviewBox.module.scss'

interface IReviewBox {
  className?: string
  data: ReactGoogleReview
  isActive?: boolean
}

const ReviewBox = ({ className, data, isActive }: IReviewBox) => {
  console.log('data ', data)
  return (
    <div
      className={classNames(
        styles['box'],
        isActive ? styles['active'] : null,
        className,
      )}
    >
      <div className={styles['box-header']}>
        <div className={styles['box-header-avatar']}>
          <Image
            src={data.reviewer.profilePhotoUrl}
            alt={data.reviewer.displayName}
            fill
            sizes="40rem"
          />
        </div>
        <p className={styles['box-header-title']}>
          {data.reviewer.displayName}
        </p>
      </div>
      <div className={styles['box-body']}>
        <p className={styles['box-body-item']}>
          Rating: {data.starRating} {data.comment}
        </p>
      </div>
    </div>
  )
}

export default ReviewBox
