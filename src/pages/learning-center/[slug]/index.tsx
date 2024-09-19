import { GetStaticPaths, GetStaticPropsContext } from 'next'
import Head from 'next/head'
import Article from '@/routes/article/Article/Article'
import { getPost } from '@/utils/graphql/getPost'
import { IPost } from '@/types'

export default function ArticlePage({ article }: { article: IPost }) {
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
    </>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { slug } = context.params!

  const { post } = await getPost(slug as string)

  return {
    props: { article: post },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
