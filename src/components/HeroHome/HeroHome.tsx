import { ReactNode } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import styles from './HeroHome.module.scss'

interface IHeroDefault {
  className?: string
  title?: string
  description?: string
  actions?: ReactNode
  banner?: string
}

const HeroHome = ({
  className,
  title,
  description,
  banner,
  actions,
}: IHeroDefault) => {
  return (
    <>
      <div className={styles['heroDefault-abstract']} />
      <section className={classNames(styles['heroDefault'], className)}>
        <div className="content-block">
          <div className="row">
            <div className="col-xs-12 col-lg-6 col-gutter-lr">
              <div className={styles['heroDefault-content']}>
                <div className={styles['heroDefault-title']}>
                  <h1>{title}</h1>
                </div>
                <div className={styles['heroDefault-description']}>
                  <p>{description}</p>
                </div>
                <div className={styles['heroDefault-actions']}>{actions}</div>
              </div>
            </div>
            <div className="col-xs-12 col-lg-6 col-gutter-lr">
              <div className={styles['heroDefault-banner']}>
                {banner ? (
                  <Image src={banner} alt={title!} loading="lazy" fill />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroHome
