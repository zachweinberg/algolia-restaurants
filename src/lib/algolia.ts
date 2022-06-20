import algoliasearch from 'algoliasearch/lite'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
)

export const getAlgoliaSearchClient = () => {
  return searchClient
}

export const getAllFoodTypes = async (): Promise<{ [key: string]: number }> => {
  try {
    const searchClient = getAlgoliaSearchClient()
    const index = await searchClient.initIndex('restaurants')
    const foodTypesMap = await index.search('', { facets: ['food_type'] })
    return foodTypesMap.facets?.['food_type'] ?? ({} as { [key: string]: number })
  } catch (err) {
    throw err
  }
}
