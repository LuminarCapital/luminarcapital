import { useCallback, useMemo } from 'react'
import classNames from 'classnames'
import styles from './Filters.module.scss'
import { ICategory } from '@/types'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { selectPosts, setCategory } from '@/store/slices/postsSlice'

interface IFilters {
  className?: string
  categories: ICategory[]
}

const defaultCategories: ICategory[] = [
  {
    id: 'all',
    name: 'All',
    slug: '',
  },
  {
    id: 'finance',
    name: 'Latest Posts',
    slug: 'latest-posts',
  },
]

const Filters = ({ className, categories }: IFilters) => {
  const dispatch = useAppDispatch()

  const {
    filter: { category: selectedCategory },
  } = useAppSelector(selectPosts) as {
    filter: { category: string }
  }
  const completedCategories = useMemo(() => {
    return [...defaultCategories, ...categories]
  }, [categories])

  const handleSelect = useCallback(
    (category: ICategory) => {
      dispatch(setCategory(category.slug))
    },
    [dispatch],
  )

  return (
    <section className={classNames(styles['filters'], className)}>
      <div className="content-block">
        <div className={styles['filters-box']}>
          <div className={styles['filters-panel']}>
            {completedCategories.map((category, index) => (
              <button
                key={`filter-${category.slug}-${index}`}
                className={classNames(
                  styles['filters-button'],
                  selectedCategory === category.slug ? styles['active'] : null,
                )}
                onClick={() => handleSelect(category)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Filters
