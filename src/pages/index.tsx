import type { NextPage } from 'next'
import { useState } from 'react'
import ConfirmModal from '~/components/ConfirmModal'
import FoodTypeFilter from '~/components/FoodTypeFilter'
import Footer from '~/components/Footer'
import RestaurantSearchBar from '~/components/RestaurantSearchBar'
import SearchResults from '~/components/SearchResults'

const Home: NextPage = () => {
  const [deleteRestaurantID, setDeleteRestaurantID] = useState<string | null>(null)

  const onDelete = () => {
    setDeleteRestaurantID('asdf')
  }

  return (
    <>
      <ConfirmModal
        open={deleteRestaurantID !== null}
        description="Are you sure you want to delete this restaurant?"
        onCancel={() => setDeleteRestaurantID(null)}
        onConfirm={() => alert(1)}
      />

      <div className="max-w-6xl mx-auto mt-10 border border-gray-200 shadow-md">
        <RestaurantSearchBar />

        <div className="flex">
          <FoodTypeFilter />
          <SearchResults onDelete={onDelete} />
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Home
