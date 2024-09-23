import styles from './Portfolio.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import Button from '@/ui/components/Button/Button'

interface IPortfolio {
  className?: string
}

const Portfolio = ({ className }: IPortfolio) => {
  return (
    <section className={classNames(styles['section'], className)}>
      <div className="content-block">
        <div className="row">
          <div className="col-xs-12 col-lg-6 col-gutter-lr">
            <div className={styles['section-content']}>
              <p className={classNames(styles['section-title'], 'h1')}>
                Advanced Portfolio Management
              </p>
              <div className={styles['section-description']}>
                <p>
                  At Luminar Capital, we empower our referral partners with
                  advanced portfolio management through our cutting-edge
                  platform, offering unparalleled transparency regarding your
                  portfolio. Our platform is perfect for enhancing clients’
                  access to capital, guaranteeing a flawless, efficient, and
                  transparent experience for everyone.
                </p>
                <p>
                  We provide detailed reporting on lead history and performance
                  further enhancing visibility and strategic decision making.
                  Furthermore, our dedicated partner relationship executives
                  streamline the process, delivering firm approvals within 2
                  hours. It has never been easier to secure the perfect
                  financing opportunities for your clients.
                </p>
              </div>
              <Button className={styles['section-action']}>
                Become a Partner
              </Button>
            </div>
          </div>
          <div className="col-xs-12 col-lg-6 col-gutter-lr first-lg">
            <div className={styles['section-banner']}>
              <Image
                src="/banners/portfolio-banner.svg"
                alt="Advanced Portfolio Management"
                width={0}
                height={0}
                loading="lazy"
                className={styles['section-banner-item']}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portfolio
