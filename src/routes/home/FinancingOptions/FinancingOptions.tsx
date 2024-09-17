import { useEffect, useState } from 'react'
import classNames from 'classnames'
import Slider from 'react-slick'
import { IFinancingOptionCard } from '@/types'
import FinancingOptionCard from '@/ui/components/FinancingOptionCard/FinancingOptionCard'
import MoneyIcon from '@/ui/icons/Money'
import DiscountIcon from '@/ui/icons/Discount'
import CreditCardIcon from '@/ui/icons/CreditCard'
import FinancingOptionCAT from '@/ui/components/FinancingOptionCAT/FinancingOptionCAT'
import styles from './FinancingOptions.module.scss'

interface IFinancingOptions {
  className?: string
}

const cards = [
  {
    title: 'Revenue Based Financing',
    description:
      'Financial institutions supported small businesses well in the 20th Century. In the 21st Century, they have become too slow, bureaucratic, and very challenging to truly meet their customers needs. We offer innovative financing options that are fast, simple, and collaborative.',
    href: '/',
    icon: MoneyIcon,
  },
  {
    title: 'Early Repayment Discounts',
    description:
      'Expecting an influx of cash flow in the near term? Utilize our competitive discounts that allow you to take advantage of significant savings if your financing is repaid early.',
    href: '/',
    icon: DiscountIcon,
  },
  {
    title: 'Revolving Working Capital',
    description:
      'We believe in offering financing that is flexible and tailored to your needs. Revolving working capital enables you to quickly access the capital required, instead of committing to a large sum immediately. This cost friendly solution can be utilized on multiple occasions and integrates into your cash flow.',
    href: '/',
    icon: CreditCardIcon,
  },
] as IFinancingOptionCard[]

const FinancingOptions = ({ className }: IFinancingOptions) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth > 600)
    }
  }, [])

  const settings = {
    adaptiveHeight: true,
    variableWidth: true,
    dots: true,
    arrows: false,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
  }

  return (
    <section className={classNames(styles['finOptions'], 'p-100-0', className)}>
      <div className="content-block">
        <div className="section-title text-center">
          <h2 className="h1">Our Financing Options</h2>
        </div>
        <div className={styles['finOptions-cards']}>
          {!isDesktop ? (
            <>
              <Slider {...settings}>
                {cards.map(({ title, description, icon, href }, index) => (
                  <FinancingOptionCard
                    key={`financing-card-${index}`}
                    title={title}
                    description={description}
                    icon={icon}
                    href={href}
                    className={styles['finOptions-cards-slide']}
                  />
                ))}
              </Slider>
              <FinancingOptionCAT />
            </>
          ) : (
            <div className="row">
              {cards.map(({ title, description, icon, href }, index) => (
                <div
                  className="col-sm-12 col-md-6"
                  key={`financing-card-${index}`}
                >
                  <FinancingOptionCard
                    title={title}
                    description={description}
                    icon={icon}
                    href={href}
                    className={styles['finOptions-cards-slide']}
                  />
                </div>
              ))}
              <div className="col-sm-12 col-md-6">
                <FinancingOptionCAT />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default FinancingOptions
