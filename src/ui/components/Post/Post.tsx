import { useEffect, useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import Button from '@/ui/components/Button/Button'
import ArrowRightIcon from '@/ui/icons/ArrowRight'
import { dateConverter } from '@/utils/dateConverter'
import { IPost } from '@/types'
import styles from './Post.module.scss'

interface IThumb {
  source_url: string | null
  alt: string
}

const Post = ({ className, data }: { className?: string; data: IPost }) => {
  const { id, excerpt, date, title } = data
  const [thumb, setThumb] = useState<IThumb>({
    source_url: null,
    alt: '',
  })

  // TODO: important, fix this moment on Backend side
  useEffect(() => {
    const fetchFeaturedMedia = async () => {
      const {
        data: {
          media_details: {
            sizes: {
              medium_large: { source_url },
            },
          },
          title: { rendered: alt },
        },
      } = await axios.get(data['_links']['wp:featuredmedia'][0].href)

      setThumb({ source_url, alt })
    }

    fetchFeaturedMedia()
  }, [data])

  return (
    <div className={classNames(styles['post'], className)}>
      <Link href={`/learning-center/${id}`} className={styles['post-thumb']}>
        {thumb.source_url ? (
          <Image
            src={thumb.source_url}
            alt={thumb.alt}
            fill
            sizes="(min-width: 601px) 390rem, (max-width: 600px) 350rem"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            loading="lazy"
          />
        ) : null}
      </Link>
      <div className={styles['post-body']}>
        <p className={styles['post-body-title']}>{title.rendered}</p>
        <div
          className={styles['post-body-description']}
          dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
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
          href={`/learning-center/${id}`}
        >
          See more
        </Button>
      </div>
    </div>
  )
}

export default Post
