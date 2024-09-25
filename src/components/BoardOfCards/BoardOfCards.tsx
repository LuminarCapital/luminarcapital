'use client'

import { useEffect, useState } from 'react'
import classNames from 'classnames'
import Slider from 'react-slick'
import { cardsCarouselSettings } from '@/config/constants'
import FinancingOptionCard from '@/ui/components/FinancingOptionCard/FinancingOptionCard'
import { IFinancingOptionCard } from '@/types'
import styles from './BoardOfCards.module.scss'

interface IBoardOfCards {
  className?: string
  title: string
  cards: IFinancingOptionCard[]
}

const BoardOfCards = ({ className, title, cards = [] }: IBoardOfCards) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth > 600)
    }
  }, [])

  if (cards.length > 0) {
    return (
      <section className={classNames(styles['section'], 'p-100-0', className)}>
        <div className="content-block">
          <div
            className={classNames(
              styles['section-title'],
              'section-title text-center',
            )}
          >
            <h2 className="h1">{title}</h2>
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

  return null
}

export default BoardOfCards
