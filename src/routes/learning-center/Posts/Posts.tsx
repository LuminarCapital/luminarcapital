import { useEffect } from 'react'
import classNames from 'classnames'
import Post from '@/ui/components/Post/Post'
import Pagination from '@/routes/learning-center/Pagination/Pagination'
import { IPageInfo, IPost } from '@/types'
import InformBox from '@/ui/components/InformBox/InformBox'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchPosts, selectPosts } from '@/store/slices/postsSlice'
import styles from './Posts.module.scss'
import { QUERY_PARAMETERS, STATUS } from '@/config/constants'
import PostsSkeleton from '@/ui/components/skeleton/PostsSkeleton/PostsSkeleton'

const Posts = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch()
  const {
    data: { nodes: posts = [], pageInfo = null },
    filter: { category },
    status,
  } = useAppSelector(selectPosts) as {
    data: {
      nodes: IPost[]
      pageInfo: IPageInfo | null
    }
    filter: {
      category: string
    }
    status: string
  }

  useEffect(() => {
    dispatch(fetchPosts({ category }))
  }, [dispatch, category])

  // TODO: add detector for empty data
  return (
    <section className={classNames(styles['posts'], 'posts', className)}>
      <div className="content-block">
        <div className={styles['posts-list']}>
          <div className="row">
            {posts.length && status === STATUS.FULFILLED ? (
              posts.map((post) => (
                <div
                  className="col-md-6 col-lg-4 col-gutter-lr"
                  key={`post-${post.id}`}
                >
                  <Post data={post} />
                </div>
              ))
            ) : posts.length === 0 && status === STATUS.FULFILLED ? (
              <div className="col-xs-12">
                <InformBox
                  title="No articles"
                  description="Sorry, there is no data available"
                />
              </div>
            ) : (
              <PostsSkeleton count={6} />
            )}
          </div>
        </div>
        {pageInfo &&
        pageInfo.hasNextPage &&
        posts.length >= QUERY_PARAMETERS.LIMIT ? (
          <Pagination />
        ) : null}
      </div>
    </section>
  )
}

export default Posts
