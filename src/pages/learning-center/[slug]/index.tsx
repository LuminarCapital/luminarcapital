import { GetStaticPaths, GetStaticPropsContext } from 'next'
import Head from 'next/head'
import Article from '@/routes/article/Article/Article'
import { getPost } from '@/utils/graphql/getPost'
import { IPageInfo, IPost } from '@/types'
import RecentArticles from '@/routes/article/RecentArticles/RecentArticles'
import { getPosts } from '@/utils/graphql/getPosts'

export default function ArticlePage({
  article,
  recentArticles,
}: {
  article: IPost
  recentArticles: {
    nodes: IPost[]
    pageInfo: IPageInfo | null
  }
}) {
  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta
          name="description"
          content="Flexible financing options that fuel the growth of small businesses."
        />
      </Head>
      <Article data={article} />
      {recentArticles.nodes.length ? (
        <RecentArticles posts={recentArticles} title="Recent Articles" />
      ) : null}
    </>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { slug } = context.params!

  const { post } = await getPost(slug as string)
  const { posts } = await getPosts({ category: '', limit: 3, not: post.id })

  return {
    props: { article: post, recentArticles: posts },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
