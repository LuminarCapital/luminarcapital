import Head from 'next/head'
import Button from '@/ui/components/Button/Button'
import HeroDefault from '@/components/HeroDefault/HeroDefault'
import InformBox from '@/ui/components/InformBox/InformBox'

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
        actions={
          <>
            <Button>Apply for Financing</Button>
          </>
        }
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
