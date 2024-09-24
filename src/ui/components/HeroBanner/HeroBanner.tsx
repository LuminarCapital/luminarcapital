import Image from 'next/image'

const HeroBanner = ({ src, title }: { src: string; title: string }) => {
  return <Image src={src} alt={title} loading="lazy" fill />
}

export default HeroBanner
