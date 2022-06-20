import type { NextApiRequest, NextApiResponse } from 'next'
import algoliasearch from 'algoliasearch'

const algoliaAdminClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_KEY!
)

const deleteRestaurantHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    if (!req.query.restaurantID) {
      return res.status(400).end()
    }

    const objectID = req.query.restaurantID as string

    const index = await algoliaAdminClient.initIndex('restaurants')

    await index.deleteObject(objectID).wait()

    res.status(200).json({ status: 'ok' })
  } else if (req.method === 'POST') {
    //
  } else {
    throw new Error('Invalid method.')
  }
}

export default deleteRestaurantHandler
