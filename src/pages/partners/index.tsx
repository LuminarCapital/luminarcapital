import Head from 'next/head'
import Button from '@/ui/components/Button/Button'
import HeroDefault from '@/components/HeroDefault/HeroDefault'
import DefaultForms from '@/components/DefaultForms/DefaultForms'
import Partnership from '@/routes/partners/Partnership/Partnership'
import Portfolio from '@/routes/partners/Portfolio/Portfolio'

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
        banner="/banners/hero-partners-banner.svg"
        actions={
          <>
            <Button>Become a Partner</Button>
          </>
        }
      />
      <Partnership />
      <Portfolio />
      <DefaultForms />
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: {},
  }
}
