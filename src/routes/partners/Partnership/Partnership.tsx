import { useEffect, useState } from 'react'
import classNames from 'classnames'
import MoneyIcon from '@/ui/icons/Money'
import DiscountIcon from '@/ui/icons/Discount'
import CreditCardIcon from '@/ui/icons/CreditCard'
import { IFinancingOptionCard } from '@/types'
import LikeIcon from '@/ui/icons/Like'
import Slider from 'react-slick'
import FinancingOptionCard from '@/ui/components/FinancingOptionCard/FinancingOptionCard'
import { cardsCarouselSettings } from '@/config/constants'
import styles from './Partnership.module.scss'

interface IPartnership {
  className?: string
}

const cards = [
  {
    title: 'Personalized Financing Options',
    description:
      'We are mindful that every business has their own unique story and scenario which allows us to take a creative approach in providing customized financing solutions. We continuously iterate our knowledge base across all industries which helps us understand potential business bottlenecks and how our financing can be beneficial over the long term.',
    icon: MoneyIcon,
  },
  {
    title: 'Attractive Referral Fees',
    description:
      'We provide our referral partners the highest compensation the market has to offer and even have a special program for our strongest relationships. We recognize the effort that is applied to secure financing for your customers, at Luminar we ensure that our referral partners are compensated appropriately.',
    icon: DiscountIcon,
  },
  {
    title: 'Efficient Process',
    description:
      "Time is everyone's most valuable asset. That is why we simplified our process by ensuring we deliver swift and firm approvals that are seamlessly completed without any hassle.",
    icon: LikeIcon,
  },
  {
    title: 'Dedicated Customer Service',
    description:
      'Experience customer service like never before with our thoughtful and skilled team. We prioritize personalized support and clear communication every step of the way to our clients and referral partner relationships.',
    icon: CreditCardIcon,
  },
] as IFinancingOptionCard[]

const Partnership = ({ className }: IPartnership) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth > 600)
    }
  }, [])

  return (
    <section className={classNames(styles['section'], 'p-100-0', className)}>
      <div className="content-block">
        <div
          className={classNames(
            styles['section-title'],
            'section-title text-center',
          )}
        >
          <h2 className="h1">The Luminar Partnership</h2>
        </div>
        <div className={styles['section-cards']}>
          {!isDesktop ? (
            <>
              <Slider {...cardsCarouselSettings}>
                {cards.map(({ title, description, icon, href }, index) => (
                  <FinancingOptionCard
                    key={`financing-card-${index}`}
                    title={title}
                    description={description}
                    icon={icon}
                    href={href}
                    className={styles['section-cards-slide']}
                  />
                ))}
              </Slider>
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
                    className={styles['section-cards-slide']}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Partnership
