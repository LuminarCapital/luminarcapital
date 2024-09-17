import classNames from 'classnames'
import Image from 'next/image'
import { personalizedExperienceData } from './data'
import styles from './PersonalizedExperience.module.scss'

interface IPersonalizedExperience {
  className?: string
}

const PersonalizedExperience = ({ className }: IPersonalizedExperience) => {
  return (
    <section
      className={classNames(styles['section'], 'p-80-0 section-bg', className)}
    >
      <div className="content-block">
        <div className="section-title text-center">
          <h2 className="h1">A Personalized Experience</h2>
        </div>
        <div className={styles['section-list']}>
          {personalizedExperienceData.map((item, index) => (
            <div
              key={`personalized-experience-${index}`}
              className={styles['section-list-item']}
            >
              <div className="row">
                <div className="col-md-12 col-lg-6 col-gutter-lr">
                  <div className={styles['section-content']}>
                    <p className={styles['section-content-label']}>
                      Step {index + 1}
                    </p>
                    <p
                      className={classNames(
                        styles['section-content-title'],
                        'h2',
                      )}
                    >
                      {item.title}
                    </p>
                    <p className={styles['section-content-description']}>
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6 col-gutter-lr">
                  <div className={styles['section-banner']}>
                    <Image src={item.image} alt={item.title} fill />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PersonalizedExperience
