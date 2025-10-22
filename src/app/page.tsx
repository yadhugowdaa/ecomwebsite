import Hero from '@/components/home/Hero'
import FeaturedCollections from '@/components/home/FeaturedCollections'
import NewArrivals from '@/components/home/NewArrivals'
import BestSellers from '@/components/home/BestSellers'
import Newsletter from '@/components/home/Newsletter'
import Categories from '@/components/home/Categories'

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <NewArrivals />
      <FeaturedCollections />
      <BestSellers />
      <Newsletter />
    </>
  )
}


