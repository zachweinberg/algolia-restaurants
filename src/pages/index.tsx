import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useClearRefinements, useInstantSearch } from 'react-instantsearch-hooks-web'
import FoodTypeFilter from '~/components/FoodTypeFilter'
import Footer from '~/components/Footer'
import RestaurantSearchBar from '~/components/RestaurantSearchBar'
import SearchResults from '~/components/SearchResults'
import { deleteRestaurantFromIndex, getAllFoodTypes } from '~/lib/algolia'
import { FoodTypeMap } from '~/types'

const Home: NextPage = () => {
  const [allFoodTypes, setAllFoodTypes] = useState<FoodTypeMap>({})
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const { refresh: refreshSearch } = useInstantSearch()
  const { refine: clearRefinements } = useClearRefinements()

  const loadFoodTypes = async () => {
    try {
      const foodTypes = await getAllFoodTypes()
      setAllFoodTypes(foodTypes)
    } catch (err) {
      console.error(err)
      alert('Could not load all food types.')
    }
  }

  useEffect(() => {
    loadFoodTypes()
  }, [])

  const onDeleteRestaurant = async (objectID: string) => {
    try {
      setIsDeleting(true)
      await deleteRestaurantFromIndex(objectID)
      loadFoodTypes()
      clearRefinements()
      refreshSearch()
    } catch (err) {
      console.error(err)
      alert('Could not delete restaurant from Algolia.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 border border-gray-200">
      <RestaurantSearchBar />

      <div className="flex">
        <FoodTypeFilter foodTypes={allFoodTypes} />
        <SearchResults onClickDelete={onDeleteRestaurant} isDeleting={isDeleting} />
      </div>

      <Footer />
    </div>
  )
}

export default Home
