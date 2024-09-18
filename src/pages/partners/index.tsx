import Head from 'next/head'
import Button from '@/ui/components/Button/Button'
import HeroDefault from '@/components/HeroDefault/HeroDefault'

export default function Partners() {
  return (
    <>
      <Head>
        <title>Partners</title>
        <meta
          name="description"
          content="Flexible financing options that fuel the growth of small businesses."
        />
      </Head>
      <HeroDefault
        title="Partner with Luminar"
        description="Join us in our mission to empower small businesses with the financing they deserve, backed by a trusted partner."
        actions={
          <>
            <Button>Become a Partner</Button>
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
