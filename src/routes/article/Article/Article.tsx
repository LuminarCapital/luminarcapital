import classNames from 'classnames'
import { IPost } from '@/types'
import Image from 'next/image'
import styles from './Article.module.scss'
import Button from '@/ui/components/Button/Button'
import ArrowLeftIcon from '@/ui/icons/ArrowLeft'

interface IArticle {
  className?: string
  data: IPost
}

const Article = ({ className, data }: IArticle) => {
  // TODO: add detector for empty data
  return (
    <section className={classNames(styles['article'], className)}>
      <div className="content-block">
        <div className="row">
          <div className="col-md-10 col-md-offset-1 col-gutter-lr">
            <h1 className={classNames(styles['article-title'], 'font-display')}>
              {data.title}
            </h1>
          </div>
          <div className="col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2 col-gutter-lr">
            <div className={styles['article-banner']}>
              <Image
                src={data.featuredImage.node.mediaItemUrl!}
                alt={data.title}
                fill
                sizes="(min-width: 601px) 1000rem, (max-width: 600px) 350rem"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
            {data.content ? (
              <div
                className={styles['article-text']}
                dangerouslySetInnerHTML={{ __html: data.content }}
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
