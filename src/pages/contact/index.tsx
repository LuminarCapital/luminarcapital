import Head from 'next/head'
import HeroSimple from '@/components/HeroSimple/HeroSimple'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Get In Touch</title>
        <meta
          name="description"
          content="Flexible financing options that fuel the growth of small businesses."
        />
      </Head>
      <HeroSimple
        title="Get In Touch"
        description="Ready to explore your financing options? Interested in becoming a partner? Need assistance with an existing account? Have a question you'd like answered? Reach out, we're here to help!"
      />
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: {},
  }
}
