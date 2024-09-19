import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/ui/components/Button/Button'
import ArrowRightIcon from '@/ui/icons/ArrowRight'
import { IPost } from '@/types'
import { dateConverter } from '@/utils/dateConverter'
import styles from './Post.module.scss'

const Post = ({ className, data }: { className?: string; data: IPost }) => {
  const {
    title,
    excerpt,
    date,
    featuredImage: {
      node: { sourceUrl },
    },
    slug,
  } = data
  return (
    <div className={classNames(styles['post'], className)}>
      <Link href={`/learning-center/${slug}`} className={styles['post-thumb']}>
        {sourceUrl ? (
          <Image
            src={sourceUrl}
            alt={title}
            fill
            sizes="(min-width: 601px) 390rem, (max-width: 600px) 350rem"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            loading="lazy"
          />
        ) : null}
      </Link>
      <div className={styles['post-body']}>
        <p className={styles['post-body-title']}>{title}</p>
        <div
          className={styles['post-body-description']}
          dangerouslySetInnerHTML={{ __html: excerpt as string }}
        />
        <p className={styles['post-body-date']}>
          {dateConverter(date as string)}
        </p>
        <Button
          variant="link"
          icon={ArrowRightIcon}
          iconPosition="right"
          size="lg"
          className={styles['post-body-action']}
          href={`/learning-center/${slug}`}
        >
          See more
        </Button>
      </div>
    </div>
  )
}

export default Post
