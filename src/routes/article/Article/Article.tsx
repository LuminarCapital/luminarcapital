import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { IPost } from '@/types'
import Image from 'next/image'
import axios from 'axios'
import Button from '@/ui/components/Button/Button'
import ArrowLeftIcon from '@/ui/icons/ArrowLeft'
import styles from './Article.module.scss'

interface IArticle {
  className?: string
  data: IPost
}

const Article = ({ className, data }: IArticle) => {
  const [thumb, setThumb] = useState<string>('')

  useEffect(() => {
    const fetchFeaturedMedia = async () => {
      const {
        data: { source_url },
      } = await axios.get(data['_links']['wp:featuredmedia'][0].href)

      setThumb(source_url)
    }

    fetchFeaturedMedia()
  }, [data])

  // TODO: add detector for empty data
  console.log(data)
  return (
    <section className={classNames(styles['article'], className)}>
      <div className="content-block">
        <div className="row">
          <div className="col-md-10 col-md-offset-1 col-gutter-lr">
            <h1 className={classNames(styles['article-title'], 'font-display')}>
              {data.title.rendered}
            </h1>
          </div>
          <div className="col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2 col-gutter-lr">
            <div className={styles['article-banner']}>
              <Image
                src={thumb}
                alt={data.title.rendered}
                fill
                sizes="(min-width: 601px) 1000rem, (max-width: 600px) 350rem"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
            {data.content ? (
              <div
                className={styles['article-text']}
                dangerouslySetInnerHTML={{ __html: data.content.rendered }}
              />
            ) : null}
            <div className={styles['article-breadcrumbs']}>
              <Button
                href="/learning-center"
                icon={ArrowLeftIcon}
                iconPosition="left"
                variant="link"
              >
                Back to blog
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Article
