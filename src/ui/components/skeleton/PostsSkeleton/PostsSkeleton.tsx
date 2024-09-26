import Skeleton from 'react-loading-skeleton'

interface IPostsSkeleton {
  className?: string
  count?: number
}

const PostsSkeleton = ({ className, count = 3 }: IPostsSkeleton) => {
  return (
    <>
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <div key={`post-skeleton-${index}`} className="col-md-6 col-lg-4">
            <Skeleton
              borderRadius={10}
              height="448rem"
              className={className}
              baseColor="#EDEFF7"
            />
          </div>
        ))}
    </>
  )
}

export default PostsSkeleton
