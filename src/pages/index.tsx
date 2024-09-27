import Head from 'next/head'
import FinancingOptions from '@/routes/home/FinancingOptions/FinancingOptions'
import Button from '@/ui/components/Button/Button'
// import ClientReviews from '@/routes/home/ClientReviews/ClientReviews'
// import {
//   dangerouslyFetchPlaceReviews,
//   ReactGoogleReview,
// } from 'react-google-reviews'
import CallToAction from '@/ui/components/CTA/CallToAction'
import HeroHome from '@/components/HeroHome/HeroHome'
import { useAppDispatch } from '@/hooks'
import { openModal } from '@/store/slices/modalSlice'
import BoardChessOrder from '@/components/BoardChessOrder/BoardChessOrder'
import { personalizedExperienceData } from '@/routes/home/personalizedExperienceData'
import CTAStyles from '@/routes/home/CTA/CallToAction.module.scss'

// export default function Home({
//   reviews,
// }: {
//   reviews: { reviews: ReactGoogleReview[]; success: boolean }
// }) {
export default function Home() {
  const dispatch = useAppDispatch()

  return (
    <>
      <Head>
        <title>Luminar Capital</title>
        <meta
          name="description"
          content="Flexible financing options that fuel the growth of small businesses."
        />
      </Head>
      <HeroHome
        title="Flexible financing options that fuel the growth of small businesses."
        description="Do you find yourself seeking capital to expand your small business? We believe every business should have the opportunity to access the financing they need to grow."
        banner="/json/main-anim.json"
        actions={
          <>
            <Button
              variant="outlined"
              onClick={() =>
                dispatch(openModal({ modal: 'partner', size: 'lg' }))
              }
            >
              Become a Partner
            </Button>
            <Button
              onClick={() =>
                dispatch(openModal({ modal: 'financing', size: 'xl' }))
              }
            >
              Apply for Financing
            </Button>
          </>
        }
      />
      <FinancingOptions />
      <BoardChessOrder
        title="A Personalized Experience"
        data={personalizedExperienceData}
        order="even"
        className="personalized-experience"
      />
      {/*<ClientReviews data={reviews} />*/}
      <CallToAction
        title="Ready To Secure Business Financing?"
        description="Contact us and connect with one of our financing professionals that can help you navigate through the steps!"
        link={{ label: 'Get in Touch', href: '/contact' }}
        className={CTAStyles['section']}
      />
    </>
  )
}

export const getStaticProps = async () => {
  // const placeId = process.env.GOOGLE_PLACE_ID!
  // const apiKey = process.env.GOOGLE_MAPS_API_KEY!
  //
  // const reviews = await dangerouslyFetchPlaceReviews(placeId, apiKey)

  // return {
  //   props: {
  //     reviews,
  //   },
  // }
  return {
    props: {},
  }
}
