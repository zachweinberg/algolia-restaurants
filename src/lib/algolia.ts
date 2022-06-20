import algoliasearch from 'algoliasearch'
import axios from 'axios'
import { Restaurant } from '~/types'

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
)

const restaurantsIndex = searchClient.initIndex('restaurants')

export const getAllFoodTypes = async (): Promise<{ [key: string]: number }> => {
  try {
    const foodTypesMap = await restaurantsIndex.search('', { facets: ['food_type'] })
    return foodTypesMap.facets?.['food_type'] ?? ({} as { [key: string]: number })
  } catch (err) {
    throw err
  }
}

export const deleteRestaurantFromIndex = async (objectID: string) => {
  return axios.delete(`/api/restaurants?restaurantID=${objectID}`)
}

export const addRestaurantToIndex = async (newRestaurant: Partial<Restaurant>) => {
  return axios.post(`/api/restaurants`, { newRestaurant })
}
