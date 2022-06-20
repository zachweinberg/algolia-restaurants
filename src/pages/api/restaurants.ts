import algoliasearch from 'algoliasearch'
import type { NextApiRequest, NextApiResponse } from 'next'

const algoliaAdminClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_KEY!
)

const restaurantsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'DELETE') {
      if (!req.query.restaurantID) {
        return res.status(400).end()
      }

      const objectID = req.query.restaurantID as string
      const restaurantsIndex = algoliaAdminClient.initIndex('restaurants')

      await restaurantsIndex.deleteObject(objectID).wait()

      res.status(200).json({ status: 'ok' })
    } else if (req.method === 'POST') {
      const newRestaurant = req.body.newRestaurant

      if (!newRestaurant) {
        return res.status(400).end()
      }
      const restaurantsIndex = algoliaAdminClient.initIndex('restaurants')

      await restaurantsIndex
        .saveObject(newRestaurant, {
          autoGenerateObjectIDIfNotExist: true,
        })
        .wait()

      res.status(200).json({ status: 'ok' })
    } else {
      throw new Error('Invalid method.')
    }
  } catch (e) {
    res.status(500).json({ error: e })
  }
}

export default restaurantsHandler
