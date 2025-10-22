import Hero from '@/components/home/Hero'
import Categories from '@/components/home/Categories'
import NewArrivals from '@/components/home/NewArrivals'
import BestSellers from '@/components/home/BestSellers'
import FeaturedCollections from '@/components/home/FeaturedCollections'
import Newsletter from '@/components/home/Newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      <NewArrivals />
      <Categories />
      <BestSellers />
      <FeaturedCollections />
      <Newsletter />
    </>
  )
}
