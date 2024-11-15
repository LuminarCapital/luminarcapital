'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { ITab } from '@/types'
import { data } from './data'
import BenefitCard from '@/ui/components/BenefitCard/BenefitCard'
import styles from './Benefits.module.scss'
import { scrollTo } from '@/utils/window/scrollTo'

interface IBenefits {
  className?: string
}

const tabs: ITab[] = [
  { title: 'Revenue Based Financing', value: 0 },
  { title: 'Early Repayment Discounts', value: 1 },
  { title: 'Revolving Working Capital', value: 2 },
]

const Benefits = ({ className }: IBenefits) => {
  const router = useRouter()
  const {
    query: { origin = '0' },
  } = router
  const activeIndex = Number(origin)

  const ref = useRef<HTMLElement | null>(null)

  const handleFormSwitch = useCallback(
    (index: string) => {
      router.replace(
        {
          pathname: router.pathname,
          query: { origin: index },
        },
        undefined,
        { scroll: false },
      )
    },
    [router],
  )

  useEffect(() => {
    if (router.query.scroll) {
      ref.current?.scrollIntoView()
    }
  }, [router.query.scroll])

  useEffect(() => {
    if (router.query.origin && !router.query.scroll) {
      scrollTo('benefits-description')
    }
  }, [router.query.origin])

  return (
    <section
      ref={ref}
      className={classNames(styles['section'], 'p-100-0', className)}
      id="benefits"
    >
      <div className="content-block">
        <div
          className={classNames(
            styles['section-title'],
            'section-title text-center',
          )}
        >
          <h2 className="h1">Benefits of Financing Options</h2>
        </div>
        <div
          className="section-description text-center"
          id="benefits-description"
        >
          <p>Click on an option below to learn more!</p>
        </div>
      </div>
      <div className={styles['section-tabs']}>
        <div className={styles['section-tabs-panel']}>
          {tabs.map((tab, index) => (
            <div
              key={`financing-tab-${index}`}
              className={classNames(
                styles['tab'],
                activeIndex === tab.value ? styles['active'] : null,
              )}
              onClick={() => handleFormSwitch(String(tab.value))}
            >
              {tab.title}
            </div>
          ))}
        </div>
      </div>
      <div className={styles['section-list']}>
        <div className="content-block">
          <div className="row center-lg">
            {data[origin as keyof ITab].map(
              ({ title, description, banner }, index) => (
                <div
                  key={`benefit-card-${index}`}
                  className="col-xs-12 col-lg-6"
                >
                  <BenefitCard
                    title={title}
                    description={description}
                    banner={banner}
                  />
                </div>
              ),
            )}
            <></>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benefits
