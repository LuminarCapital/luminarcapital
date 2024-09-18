import Head from 'next/head'
import HeroSimple from '@/components/HeroSimple/HeroSimple'
import InformBox from '@/ui/components/InformBox/InformBox'

export default function LearningCenter() {
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
      <InformBox
        title="Coming Soon!"
        description="Exciting things are on the way — stay tuned!"
      />
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: {},
  }
}
