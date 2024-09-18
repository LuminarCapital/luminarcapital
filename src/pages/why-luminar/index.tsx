import Head from 'next/head'
import Button from '@/ui/components/Button/Button'
import HeroDefault from '@/components/HeroDefault/HeroDefault'

export default function WhyLuminar() {
  return (
    <>
      <Head>
        <title>Why Luminar Luminar</title>
        <meta
          name="description"
          content="Flexible financing options that fuel the growth of small businesses."
        />
      </Head>
      <HeroDefault
        title="Why Luminar Capital"
        description="There are many options when it comes to financing for your business, customers choose us as we seek long term partners, helping you to surpass your goals."
        actions={
          <>
            <Button variant="outlined">Become a Partner</Button>
            <Button>Apply for Financing</Button>
          </>
        }
      />
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: {},
  }
}
