import Head from 'next/head'
import HeroDefault from '@/components/HeroDefault/HeroDefault'
import FinancingOptions from '@/routes/home/FinancingOptions/FinancingOptions'
import PersonalizedExperience from '@/routes/home/PersonalizedExperience/PersonalizedExperience'
import Button from '@/ui/components/Button/Button'
import ClientReviews from '@/routes/home/ClientReviews/ClientReviews'
import {
  dangerouslyFetchPlaceReviews,
  ReactGoogleReview,
} from 'react-google-reviews'
import CallToAction from '@/ui/components/CTA/CallToAction'

export default function Home({
  reviews,
}: {
  reviews: { reviews: ReactGoogleReview[]; success: boolean }
}) {
  return (
    <>
      <Head>
        <title>Luminar Capital</title>
        <meta
          name="description"
          content="Flexible financing options that fuel the growth of small businesses."
        />
      </Head>
      <HeroDefault
        title="Flexible financing options that fuel the growth of small businesses."
        description="Do you find yourself seeking capital to expand your small business? We believe every business should have the opportunity to access the financing they need to grow."
        actions={
          <>
            <Button variant="outlined">Become a Partner</Button>
            <Button>Apply for Financing</Button>
          </>
        }
      />
      <FinancingOptions />
      <PersonalizedExperience />
      <ClientReviews data={reviews} />
      <CallToAction
        title="Ready To Secure Business Financing?"
        description="Contact us and connect with one of our financing professionals that can help you navigate through the steps!"
        link={{ label: 'Get in Touch', href: '/' }}
      />
    </>
  )
}

export const getStaticProps = async () => {
  const placeId = process.env.GOOGLE_PLACE_ID!
  const apiKey = process.env.GOOGLE_MAPS_API_KEY!

  const reviews = await dangerouslyFetchPlaceReviews(placeId, apiKey)

  return {
    props: {
      reviews,
    },
  }
}
