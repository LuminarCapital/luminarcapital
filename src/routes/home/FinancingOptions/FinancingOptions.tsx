import classNames from 'classnames'
import { Splide, SplideSlide } from '@splidejs/react-splide'
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
  const options = {
    type: 'slide',
    perMove: 1,
    perPage: 1,
    updateOnMove: true,
    speed: 1000,
    easing: 'ease',
    pagination: true,
    arrows: false,
    gap: '16rem',
    rewind: true,
    padding: { left: '16rem', right: '16rem' },
    autoWidth: true,
    autoHeight: true,
    destroy: true,
    breakpoints: {
      600: {
        destroy: false,
      },
    },
  }

  return (
    <section className={classNames(styles['finOptions'], 'p-100-0', className)}>
      <div className="content-block">
        <div className="section-title text-center">
          <h2 className="h1">Our Financing Options</h2>
        </div>
        <div className={styles['finOptions-cards']}>
          <Splide options={options}>
            {cards.map(({ title, description, icon, href }, index) => (
              <SplideSlide key={`financing-card-${index}`}>
                <FinancingOptionCard
                  title={title}
                  description={description}
                  icon={icon}
                  href={href}
                />
              </SplideSlide>
            ))}
          </Splide>
          <FinancingOptionCAT />
        </div>
      </div>
    </section>
  )
}

export default FinancingOptions
