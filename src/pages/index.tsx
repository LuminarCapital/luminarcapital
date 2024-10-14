import Head from 'next/head'
import InformBox from '@/ui/components/InformBox/InformBox'

export default function Home() {
  return (
    <>
      <Head>
        <title>Luminar Capital</title>
        <meta
          name="description"
          content="Flexible financing options that fuel the growth of small businesses."
        />
      </Head>
      <InformBox description="Coming Soon" title="Luminar Capital" />
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: {},
  }
}
