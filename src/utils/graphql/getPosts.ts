import { QUERY_PARAMETERS } from '@/config/constants'

export const getPosts = async (category = '') => {
  const res = await fetch(process.env.WORDPRESS_API_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetPosts {
          posts(first: ${QUERY_PARAMETERS.LIMIT}, where: { categoryName: "${category}" }) {
            nodes {
              id
              slug
              title
              excerpt(format: RENDERED)
              date
              featuredImage {
                node {
                  sourceUrl(size: MEDIUM_LARGE)
                }
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
          }
        }
    `,
    }),
    next: {
      revalidate: 0,
    },
  })

  const { data } = await res.json()

  return data
}
