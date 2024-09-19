import Head from 'next/head'
import HeroSimple from '@/components/HeroSimple/HeroSimple'
import Filters from '@/routes/learning-center/Filters/Filters'
import Posts from '@/routes/learning-center/Posts/Posts'
import { ICategory, IPageInfo } from '@/types'
import { getCategories } from '@/utils/graphql/getCategories'

interface ILearningCenter {
  categories: {
    nodes: ICategory[]
    pageInfo: IPageInfo
  }
}

export default function LearningCenter({ categories }: ILearningCenter) {
  return (
    <>
      <Head>
        <title>Learning Center</title>
        <meta
          name="description"
          content="Flexible financing options that fuel the growth of small businesses."
        />
      </Head>
      <HeroSimple
        title="Luminar Learning Center"
        description="There are many options when it comes to financing for your business. We offer resources that can help take the complexity out of the process to ensure you find the best product suited for your needs."
      />
      <Filters categories={categories.nodes} />
      <Posts />
    </>
  )
}

export const getStaticProps = async () => {
  const { categories } = await getCategories()

  return {
    props: {
      categories: categories || [],
    },
  }
}
