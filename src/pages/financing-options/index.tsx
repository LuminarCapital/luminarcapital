import Head from 'next/head'
import Button from '@/ui/components/Button/Button'
import HeroDefault from '@/components/HeroDefault/HeroDefault'
import Benefits from '@/routes/financing-options/Benefits/Benefits'
import CallToAction from '@/ui/components/CTA/CallToAction'
import CTASolid from '@/ui/components/CTASolid/CTASolid'

export default function FinancingOptions() {
  return (
    <>
      <Head>
        <title>Financing Options</title>
        <meta
          name="description"
          content="Flexible financing options that fuel the growth of small businesses."
        />
      </Head>
      <HeroDefault
        title="Financing Options"
        description="Looking for financing catered to your business needs? Our personalized solutions factor incoming revenue and cash flow, not just your credit which provides a different approach compared to conventional products."
        banner="/banners/hero-financing-options-banner.svg"
        actions={
          <>
            <Button>Apply for Financing</Button>
          </>
        }
      />
      <Benefits />
      <CTASolid />
      <CallToAction
        title="Want to learn more about our financing options?"
        description="Contact us and connect with one of our financing professionals that can help you navigate through the steps!"
        link={{ label: 'Get in Touch', href: '/' }}
      />
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: {},
  }
}
