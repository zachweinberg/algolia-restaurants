import type { NextPage } from 'next'
import FoodTypeFilter from '~/components/FoodTypeFilter'
import Footer from '~/components/Footer'
import RestaurantSearchBar from '~/components/RestaurantSearchBar'
import SearchResults from '~/components/SearchResults'

const Home: NextPage = () => {
  return (
    <div className="mx-auto max-w-6xl border-gray-200 border mt-10 shadow-md">
      <RestaurantSearchBar />

      <div className="flex">
        <FoodTypeFilter />
        <SearchResults />
      </div>

      <Footer />
    </div>
  )
}

export default Home
